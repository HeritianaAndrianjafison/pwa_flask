
        function getCookie(name) {
            value =  document.cookie;
            const parts = value.split(name + "=");
            if (parts.length === 2) 
                return parts.pop().split(';').shift();
            
        }
        const SetCookies = function(name, value, expiryDays, domain, path, secure){
        const exdate = new Date();
              exdate.setHours(
                        exdate.getHours() + (typeof expiryDays !== "number"? 365: expiryDays) * 24);
        
        document.cookie =
                name +
                "=" +
                value +
                ";expires=" +
                exdate.toUTCString() +
                ";path=" +
                (path || "/") +
                (domain ? ";domain=" + domain : "") +
                (secure ? ";secure" : "");
        };
        const $cookieBanner =  document.querySelector(".cookies-eu-banner"); 
        const $cookieBannerButton = $cookieBanner.querySelector("button"); 
        const $cookieName = "cookiesBanner";
        const $hasCookie = getCookie("cookiesBanner");
        
        if (!$hasCookie){
           $cookieBanner.classList.remove("hidden");
        }   
        function AcceptCookies() {
           SetCookies("cookiesBanner", "closed");  
           $cookieBanner.remove();
          }
              
