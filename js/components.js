// Hàm tải component từ file HTML
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        
        if (!response.ok) {
            throw new Error(`Không thể tải component từ ${componentPath}`);
        }
        
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        
        // Nếu là sidebar, thiết lập sự kiện cho menu
        if (containerId === 'sidebar-container') {
            setupSidebarEvents();
        }
    } catch (error) {
        console.error("Lỗi khi tải component:", error);
        document.getElementById(containerId).innerHTML = `<p>Không thể tải thành phần: ${error.message}</p>`;
    }
}

// Thiết lập sự kiện cho sidebar
function setupSidebarEvents() {
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            
            const pageId = this.getAttribute("data-page");
            navigateTo(pageId);
        });
    });
}
