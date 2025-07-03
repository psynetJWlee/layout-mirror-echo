$(document).ready(function() {
    // Market Navigation Tab Switching
    $('.market-tab').on('click', function() {
        const targetTab = $(this).data('tab');
        
        // Remove active class from all tabs and content
        $('.market-tab').removeClass('active');
        $('.tab-content').removeClass('active');
        
        // Add active class to clicked tab and corresponding content
        $(this).addClass('active');
        $(`#${targetTab}-content`).addClass('active');
    });
    
    // Expand/Collapse functionality
    $('.expand-button').on('click', function() {
        const button = $(this);
        const isExpanded = button.hasClass('expanded');
        
        if (isExpanded) {
            // Collapse
            button.removeClass('expanded');
            button.find('.expand-text').text('상세정보 펼쳐보기');
            
            // Hide additional rows (you can modify this based on your data structure)
            $('.odds-table tbody tr:not(.initial-row):not(:first-child)').slideUp();
        } else {
            // Expand
            button.addClass('expanded');
            button.find('.expand-text').text('상세정보 접기');
            
            // Show additional rows
            $('.odds-table tbody tr:not(.initial-row):not(:first-child)').slideDown();
        }
    });
    
    // Smooth scrolling for navigation
    $('.market-tab').on('click', function() {
        $('html, body').animate({
            scrollTop: $('.market-content').offset().top - 100
        }, 300);
    });
    
    // Add hover effects for odds cells
    $('.odds-cell').on('mouseenter', function() {
        $(this).css('background-color', '#f0f0f0');
    }).on('mouseleave', function() {
        $(this).css('background-color', '');
    });
    
    // Real-time odds simulation (optional enhancement)
    function simulateOddsUpdate() {
        const oddsCells = $('.odds-cell');
        
        oddsCells.each(function() {
            const cell = $(this);
            const currentOdds = parseFloat(cell.text());
            
            if (!isNaN(currentOdds)) {
                // Simulate small random changes
                const change = (Math.random() - 0.5) * 0.1;
                const newOdds = Math.max(1.01, currentOdds + change);
                
                // Update with animation
                cell.fadeOut(200, function() {
                    cell.text(newOdds.toFixed(2)).fadeIn(200);
                });
            }
        });
    }
    
    // Uncomment the line below to enable real-time simulation
    // setInterval(simulateOddsUpdate, 10000); // Update every 10 seconds
    
    // Initialize tooltip functionality
    $('[data-tooltip]').on('mouseenter', function() {
        const tooltip = $(this).data('tooltip');
        $('<div class="tooltip">')
            .text(tooltip)
            .appendTo('body')
            .fadeIn('fast');
    }).on('mouseleave', function() {
        $('.tooltip').remove();
    });
    
    // Handle window resize for responsive adjustments
    $(window).on('resize', function() {
        adjustLayoutForMobile();
    });
    
    function adjustLayoutForMobile() {
        const isMobile = $(window).width() <= 768;
        
        if (isMobile) {
            // Mobile-specific adjustments
            $('.chart-container').addClass('mobile-layout');
            $('.odds-table').addClass('mobile-table');
        } else {
            // Desktop layout
            $('.chart-container').removeClass('mobile-layout');
            $('.odds-table').removeClass('mobile-table');
        }
    }
    
    // Initial layout adjustment
    adjustLayoutForMobile();
    
    // Add loading states for better UX
    function showLoading(element) {
        element.append('<div class="loading-spinner">로딩 중...</div>');
    }
    
    function hideLoading(element) {
        element.find('.loading-spinner').remove();
    }
    
    // Simulate data loading on tab switch
    $('.market-tab').on('click', function() {
        const targetContent = $(`#${$(this).data('tab')}-content`);
        
        if (targetContent.find('.coming-soon').length > 0) {
            showLoading(targetContent);
            
            setTimeout(function() {
                hideLoading(targetContent);
            }, 1000);
        }
    });
    
    // Add keyboard navigation
    $(document).on('keydown', function(e) {
        const currentTab = $('.market-tab.active');
        let nextTab;
        
        switch(e.keyCode) {
            case 37: // Left arrow
                nextTab = currentTab.prev('.market-tab');
                if (nextTab.length === 0) {
                    nextTab = $('.market-tab').last();
                }
                nextTab.click();
                break;
                
            case 39: // Right arrow
                nextTab = currentTab.next('.market-tab');
                if (nextTab.length === 0) {
                    nextTab = $('.market-tab').first();
                }
                nextTab.click();
                break;
        }
    });
    
    // Accessibility improvements
    $('.market-tab').attr('role', 'tab');
    $('.tab-content').attr('role', 'tabpanel');
    
    // Focus management
    $('.market-tab').on('focus', function() {
        $(this).addClass('focused');
    }).on('blur', function() {
        $(this).removeClass('focused');
    });
});