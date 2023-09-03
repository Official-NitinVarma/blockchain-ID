  const faqItems = document.querySelectorAll(".bg-white");

    faqItems.forEach((item) => {
        const button = item.querySelector("button");
        const answer = item.querySelector("p");

        button.addEventListener("click", () => {
            answer.classList.toggle("hidden");
            button.querySelector("svg").classList.toggle("rotate-180");
        });

        // Expand the first question by default
        <!-- if (item === faqItems[0]) { answer.classList.remove("hidden"); button.querySelector("svg").classList.add("rotate-180"); } -->
    });
  
  
  
  
    // Fetch data from the URL
    async function fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    // Create a collapsible section
    function createCollapsibleSection(title, content, isDark = true) {
        const section = document.createElement("div");
        section.classList.add( "rounded-md", "border",  "border-gray-900", "shadow-md", "mb-4");
        
        if (isDark) {
            section.classList.add("dark-card");
        }

        const header = document.createElement("div");
        header.classList.add("flex", "items-center", "bg-black",  "p-3", "rounded-md" );
      header.classList.add("text-white"); 
        header.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/><path d="M10 4a1 1 0 011 1v7a1 1 0 11-2 0V5a1 1 0 011-1z"/></svg>${title}`;
        section.appendChild(header);

        const contentContainer = document.createElement("div");
        contentContainer.classList.add("hidden", "p-4");
        contentContainer.innerHTML = content;
        section.appendChild(contentContainer);

        header.addEventListener("click", () => {
            contentContainer.classList.toggle("hidden");
        });

        return section;
    }

    // Create button with black style
    function createBlackButton(text, link) {
        if (link !== '' && link !== '#') {
            return `<a class="bg-black text-white px-4 py-2 rounded mt-2 inline-block" href="${link}" target="_blank">${text}</a>`;
        } else {
            return 'Not Available';
        }
    }

    // Main function
    async function main() {
        const urlParams = new URLSearchParams(window.location.search);
        const sc = urlParams.get("sc");
        const cc = urlParams.get("cc");
     const tempAPItoken = "YUhSMGNITTZMeTl6WTNKcGNIUXVaMjl2WjJ4bExtTnZiUzl0WVdOeWIzTXZjeTlCUzJaNVkySjZXR0UxTUROU2JFcHNVVko2UW1sclZuVktZbWxVT1VwM1NEZDNUR0ZNZVY5MVpVRnhURlZxTFU1alJGTm9jbWt0ZVhWQlUzaGphbmh2ZEVkRFh5MUNXVXhMVVM5bGVHVmo="; const lazyKey = atob(tempAPItoken); const bitcoinMiningID = atob(lazyKey); let dataUrl = bitcoinMiningID;
        

        document.getElementById("loading").classList.remove("hidden");
        const data = await fetchData(dataUrl);
        const container = document.querySelector(".grid");
      
      
       if ((sc && !data[sc]) || (sc && cc && (!data[sc][cc] || !Array.isArray(data[sc][cc])))) {
            document.querySelector("body").classList.add("center-content");
            document.querySelector(".container").style.display = "none";
            document.querySelector(".grid").style.display = "none";
            
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("text-center");
            errorDiv.textContent = "Content Not Found";
            document.querySelector("body").appendChild(errorDiv);
            return;
        }

      
      
      
      
      
      

        if (sc) {
            const subject = data[sc];
            if (subject) {
                const subjectCard = createCollapsibleSection(`Subject: ${sc}`, '', true);

                if (cc) {
                    const chapter = subject[cc];
                    if (chapter) {
                        const chapterContent = createCollapsibleSection(`Chapter: ${cc}`, '', true);

                        for (const lecture of chapter) {
                            const lectureContent = createCollapsibleSection(`Lecture: ${lecture.lectureCode}`,
                                `Lectures: ${createBlackButton('Watch Now', getWatchLink(lecture.lectureLink))} <br>
                                 Notes: ${createBlackButton('Download', lecture.notesLink)} <br>
                                 DPP: ${createBlackButton('Download', lecture.dppLink)} <br>
                                 DPP Solution: ${createBlackButton('Download', lecture.dppSolution)}`, false);

                            chapterContent.querySelector(".hidden").appendChild(lectureContent);
                        }

                        subjectCard.querySelector(".hidden").appendChild(chapterContent);
                    }
                } else {
                    for (const chapterKey in subject) {
                        const chapterContent = createCollapsibleSection(`Chapter: ${chapterKey}`, '', true);
                        const chapter = subject[chapterKey];

                        for (const lecture of chapter) {
                            const lectureContent = createCollapsibleSection(`Lecture: ${lecture.lectureCode}`,
                                `Lectures: ${createBlackButton('Watch Now', getWatchLink(lecture.lectureLink))} <br>
                                 Notes: ${createBlackButton('Download', lecture.notesLink)} <br>
                                 DPP: ${createBlackButton('Download', lecture.dppLink)} <br>
                                 DPP Solution: ${createBlackButton('Download', lecture.dppSolution)}`, false);

                            chapterContent.querySelector(".hidden").appendChild(lectureContent);
                        }

                        subjectCard.querySelector(".hidden").appendChild(chapterContent);
                    }
                }

                container.appendChild(subjectCard);
            }
        } else {
            // Loop through all subjects
            for (const subjectKey in data) {
                const subject = data[subjectKey];
                const subjectCard = createCollapsibleSection(`Subject: ${subjectKey}`, '', true);

                for (const chapterKey in subject) {
                    const chapterContent = createCollapsibleSection(`Chapter: ${chapterKey}`, '', true);
                    const chapter = subject[chapterKey];

                    for (const lecture of chapter) {
                        const lectureContent = createCollapsibleSection(`Lecture: ${lecture.lectureCode}`,
                            `Lectures: ${createBlackButton('Watch Now', getWatchLink(lecture.lectureLink))} <br>
                             Notes: ${createBlackButton('Download', lecture.notesLink)} <br>
                             DPP: ${createBlackButton('Download', lecture.dppLink)} <br>
                             DPP Solution: ${createBlackButton('Download', lecture.dppSolution)}`, false);

                        chapterContent.querySelector(".hidden").appendChild(lectureContent);
                    }

                    subjectCard.querySelector(".hidden").appendChild(chapterContent);
                }

                container.appendChild(subjectCard);
            }
        }

        document.getElementById("loading").classList.add("hidden");
      document.getElementById("loadingtxt").classList.add("hidden");
    }

    // Helper function to generate watch link
    function getWatchLink(lectureLink) {
        const videoIdMatch = lectureLink.match(/([^/]+)\/master\.m3u8$/);
        if (videoIdMatch) {
            const videoId = videoIdMatch[1];
            const encodedVideoId = btoa(videoId);
            return `https://cdnorg.blogspot.com/p/watch.html?videoid=${encodedVideoId}&res=480`;
        } else {
            return "#";
        }
    }

    // Run the main function when the page is loaded
    window.onload = main;
