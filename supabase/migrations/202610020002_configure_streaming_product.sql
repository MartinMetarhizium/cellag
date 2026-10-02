update public.products
set
  name = 'Streaming CAPA 2026',
  description = 'Acceso virtual por Zoom al Congreso Argentino de Proteínas Alternativas 2026.',
  price = 44999,
  currency = 'ARS',
  active = true,
  includes_text = 'Transmisión en vivo por Zoom durante las jornadas habilitadas. El acceso se enviará luego de confirmar manualmente el pago.',
  terms_text = 'Acceso personal. La acreditación del pago y la habilitación del acceso se realizan manualmente.',
  access_key = 'streaming-capa-2026'
where slug = 'streaming-capa-2026';
