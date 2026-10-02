/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { requireSupabase, supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;
    const load = async (nextSession) => {
      if (!active) return;
      setSession(nextSession);
      if (!nextSession?.user) { setProfile(null); setLoading(false); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", nextSession.user.id).maybeSingle();
      if (active) { setProfile(data); setLoading(false); }
    };
    supabase.auth.getSession().then(({ data }) => load(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => load(nextSession));
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  const value = useMemo(() => ({
    session, user: session?.user || null, profile, loading,
    signIn: (email, password) => requireSupabase().auth.signInWithPassword({ email, password }),
    signUp: (payload) => requireSupabase().auth.signUp({ email: payload.email, password: payload.password, options: { data: { first_name: payload.firstName, last_name: payload.lastName, country: payload.country, terms_accepted: true } } }),
    resetPassword: (email) => requireSupabase().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/mi-cuenta?reset=1` }),
    signOut: () => requireSupabase().auth.signOut(),
  }), [session, profile, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return value;
}
