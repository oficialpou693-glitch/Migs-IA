const CACHE_NAME = 'migs-ai-v4';
const ASSETS = [
  '/',
  '/index.html',
  // Adicione aqui outros arquivos locais como .css ou .js se tiver separado
];

// Instalação e Cache Inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Migs AI: Cacheando arquivos de sistema... 🛠️');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação e Limpeza de Caches Antigos (O MAIS IMPORTANTE)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Migs AI: Deletando cache antigo e bugado... 💀');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia: Network First (Tenta a internet, se der erro de conexão, usa o cache)
// Isso garante que você sempre pegue a versão SEM IMAGENS se tiver internet.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
                       
