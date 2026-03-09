// const staticCacheName = 's-app-v1';

const CACHE_NAME = 'offline-cache-v1';

// const assets = [
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/js/ui.js',
  '/assets/js/app.js',
//   '/assets/js/ot.js', 
//   '/assets/js/ot2025.js', 
  '/assets/js/settings.js',  
//   '/assets/js/st5.js',
//   '/assets/js/st6.js',
//   '/assets/js/ex6.js',
//   '/assets/js/ex5.js',
  '/assets/js/base26.js',
  '/assets/images/logo-192x192.png',
  '/assets/images/logo-512x512.png',
  '/assets/images/maskable_icon.png', 
  '/favicon.png',
  '/sw.js',
  '/assets/css/main.css',  
  '/assets/css/theme.css', 
  'https://fonts.googleapis.com/css?family=Lato:300,400,700',
];

// Установка: кэшируем основные файлы
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .catch(err => console.error('Кэширование не удалось:', err))
    );
});

// Активация: очистка старых кэшей (опционально)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
    // Обрабатываем только запросы с текущего origin (опционально)
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Если запрос успешен — кэшируем его копию
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // При ошибке — ищем в кэше
                    return caches.match(event.request)
                        .then((cachedResponse) => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            // Если нет в кэше — возвращаем заглушку
                            return new Response('Нет подключения к сети', {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: { 'Content-Type': 'text/plain' }
                            });
                        });
                })
        );
    }
});


// const CACHE_NAME = 'cache1';
// self.addEventListener('install', async event => {
//     console.log('install',event);
//     // Открываем кеш и получаем объект кеша
//     // объекты кеша могут хранить ресурсы
//     const cache = await caches.open(CACHE_NAME);
//     // Ждем добавления
//     await cache.addAll(assets);
//     await self.skipWaiting();
// });

// // Удаляем старый кеш при активации
// self.addEventListener('activate', async event => {
//     // Получаем все ключи кеша
//     const keys = await caches.keys();
//     keys.forEach(key => {
//         // Если имя кеша отличается от текущего имени
//         // удаляем кеш
//         if(key !== CACHE_NAME){
//             caches.delete(key)
//         }
//     })
//     await self.clients.claim();
// });


// // Определяем, успешен ли запрос ресурса
// // Успех -> Ответ на успешный результат
// // не удалось -> прочитать кешированный контент
// self.addEventListener('fetch', event => {
//    const req = event.request
//    // отвечаем браузеру
//    event.respondWith(networkFirst(req))
// });

// // Сначала сеть
// async function networkFirst(req){
//     try{
//         // Сначала получаем самые свежие ресурсы из сети
//         // Запрос может завершиться неудачно, попробуйте
//         // Если есть сеть, запрос успешен, используем запрошенные данные
//         const fresh = await fetch(req)
//         return fresh
//     }catch(e){
//         // Когда сети нет, запрос не выполняется и используются кешированные данные
//         const cache = await caches.open(CACHE_NAME)
//         // Сопоставить результат, соответствующий req в кеше
//         const cached = await cache.match(req)
//         return cached
//     }

// }



