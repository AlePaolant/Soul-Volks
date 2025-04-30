document.querySelectorAll('.link-btn').forEach(link => {
    const url = link.getAttribute('data-url');
    const img = link.querySelector('img');

    fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success" && data.data.image?.url) {
          img.src = data.data.image.url;
        }
      })
      .catch(() => {
        // Fallback già presente
      });
  });