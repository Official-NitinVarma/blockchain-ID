const videoContainer = document.getElementById('video-container');
           const errorContainer = document.getElementById('error-container');
         const videoPlayer = document.querySelector('video');
         const shareButton = document.getElementById('share-button');
         const vlcButton = document.getElementById('vlc-button');
         const spinner = document.getElementById('spinner');
         const errorSection = document.getElementById('error-section');
         const errorTitle = errorSection.querySelector('h1');
         const errorText = errorSection.querySelector('p');
         const queryParams = new URLSearchParams(window.location.search);
         
         let errorMsg = '';
         
         // Handle Plyr.io library load error
         if (typeof Plyr === 'undefined') {
           errorMsg = 'notfound';
           errorTitle.textContent = '404';
           errorText.textContent = 'Library not found';
           errorSection.querySelector('a').classList.remove('hidden');
           videoContainer.style.display = 'none'; // Hide video container
           errorSection.classList.remove('hidden'); // Display error section
         } else {
           const isLazy = queryParams.get('lazy') === 'true';
           const isEncoded = queryParams.get('enc') === 'true';
           const videoId = queryParams.get('videoid');
           const quality = queryParams.get('res') || '720';
         
           // Check if videoId is base64 encoded
           const isBase64Encoded = (videoId) => {
             try {
               return btoa(atob(videoId)) === videoId;
             } catch (e) {
               return false;
             }
           };
         
           if (videoId && isBase64Encoded(videoId)) {
             if (isLazy) {
               let videoUrl = `https://d26g5bnklkwsh4.cloudfront.net/${videoId}/hls/${quality}/main.m3u8`;
         
               if (isEncoded) {
                 const decodedVideoId = atob(videoId);
                 videoUrl = `https://d26g5bnklkwsh4.cloudfront.net/${decodedVideoId}/hls/${quality}/main.m3u8`;
               
               }
         
               videoPlayer.src = videoUrl;
               errorContainer.style.display = 'none';
                
             } else {
              
               
               const jojodecodedVideoId = atob(videoId);
               const magicVideoUrl = `https://d26g5bnklkwsh4.cloudfront.net/${jojodecodedVideoId}/hls/${quality}/main.m3u8`;
               videoPlayer.src = magicVideoUrl;
             }
           } else {
             errorMsg = 'notfound';
             errorTitle.textContent = 'Video Not Found';
             errorText.textContent = 'Something went wrong. Please check the video URL and try again.';
             errorSection.querySelector('a').classList.remove('hidden');
             videoContainer.style.display = 'none'; // Hide video container
             errorSection.classList.remove('hidden'); // Display error section
           }
         }

        
        
 function openVlcLink() {
    const videoSrc = videoPlayer.getAttribute('src');
    if (videoSrc) {
      const vlcUrl = `vlc://${videoSrc}`;
      window.open(vlcUrl);
    } else {
      alert('Video source URL is missing.');
    }
  }

  // Add a click event listener to the VLC button
  vlcButton.addEventListener('click', openVlcLink);
    
         
         shareButton.addEventListener('click', () => {
           navigator.clipboard.writeText(window.location.href).then(() => {
             shareButton.textContent = 'Copied!';
             setTimeout(() => {
               shareButton.textContent = 'Share Video';
             }, 1500);
           }).catch((error) => {
             console.error('Clipboard write error:', error);
           });
         });
         
         videoPlayer.addEventListener('canplay', () => {
           spinner.classList.add('hidden');
           
           
         });
         
         videoPlayer.addEventListener('error', () => {
          
           errorTitle.textContent = 'Something went wrong';
           errorText.textContent = 'An error occurred while loading the video. Please check the video URL or try viewing the content on mobile device.';
           spinner.classList.add('hidden');
           videoContainer.style.display = 'none'; // Hide video container
           
           errorSection.classList.remove('hidden'); // Display error section
         });
         
          // Initialize Plyr video
          
         const player = new Plyr(videoPlayer, {controls: ['play-large','rewind', 'play', 'fast-forward', 'progress', 'duration', 'mute', 'volume', 'settings', 'fullscreen'], disableContextMenu: true, speed: { selected: 1, options: [0.75, 1, 1.25, 1.5, 1.75, 2] }, tooltips: { controls: true, seek: true }, keyboard: { focused: true, global: false }, ads: { enabled: false, publisherId: '', tagUrl: '' },	});
         
         
         
