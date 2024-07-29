// document.addEventListener('DOMContentLoaded', function() {
//     const header = document.getElementById('header');
//     let lastScrollTop = 0;
//     let isShrinked = false;
  
//     const debounce = (func, wait) => {
//       let timeout;
//       return function(...args) {
//         const context = this;
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(context, args), wait);
//       };
//     };
  
//     const handleScroll = debounce(() => {
//       let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
//       if (scrollTop > lastScrollTop && scrollTop > 100) {
//         // Scroll hacia abajo
//         if (!isShrinked) {
//           header.classList.add('shrink');
//           isShrinked = true;
//         }
//       } else if (scrollTop < lastScrollTop && scrollTop <= 100) {
//         // Scroll hacia arriba y menor a 100
//         if (isShrinked) {
//           header.classList.remove('shrink');
//           isShrinked = false;
//         }
//       }
  
//       lastScrollTop = scrollTop;
//     }, 100);
  
//     window.addEventListener('scroll', handleScroll);
//   });