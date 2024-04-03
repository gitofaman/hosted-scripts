$(document).ready(function(){
    var attributes = {
        dropdown: {
            'main': 'dropdown',
            'toggle': 'd-toggle',
            'content': 'd-content',
            'arrow': 'd-arrow'
        },
        popup: {
            'main': 'comp-popup',
            'sibling': 'open-sibling',
            'close': 'comp-close',
            'open': 'open-popup'
        }
    }
    var atr = (atrName) => {
        return `[${atrName}]`
    }
    //dropdown opener
    $(atr(attributes.dropdown.main)).each(function(){
        var $main = $(this)
        var dToggle = $(this).find(atr(attributes.dropdown.toggle));
        var dContent = $(this).find(atr(attributes.dropdown.content));
        var dArrow = $(this).find(atr(attributes.dropdown.arrow));
    
        dContent.css({
            overflow: 'none',
            display: 'block'
        })
    
        var dTl = gsap.timeline();
    
        var dOpen = false;
    
        var timelineAction = dTl.fromTo(dContent, {
            height: '0',
        }, {
            height: 'auto',
        }).fromTo(dArrow, {
            rotate: 0
        }, {
            rotate: 180
        }, '0')
    
        var closeDropdown = () => {
            timelineAction.reverse()
        }
    
        var openDropdown = () => {
            timelineAction.play()
        }
    
        var toggleDropdown = () => {
            if(dOpen) {
                dOpen = false
                closeDropdown()
            } else {
                dOpen = true
                openDropdown()
            }
        }
        if($(window).width() < 992) {
            dToggle.on('click', ()=>{
                toggleDropdown()
            })
        } else {
            $main.on('mouseover', openDropdown)
            $main.on('mouseout', closeDropdown)   
        }
        
        closeDropdown()
    
    })
    
    //popup opener
    var openPopup = (popupEl) => {
        gsap.fromTo(popupEl, {
            opacity: 0,
            display: 'flex',
        },{
            opacity: 1,
            duration: 0.3
        });
    };
    
    var closePopup = (popupEl) => {
        gsap.to(popupEl, {
            opacity: 0,
            duration: .3,
            onComplete: function(){
                popupEl.css({
                    'display': 'none'
                });
            }
        });
    };
    
    $(atr(attributes.popup.sibling)).on('click', function() {
        var $siblingPopup = $(this).siblings().filter(atr(attributes.popup.main));
        openPopup($siblingPopup);
    });
    
    $(atr(attributes.popup.close)).on('click', function() {
        closePopup($(this).closest(atr(attributes.popup.main)));
    });
    $(atr(attributes.popup.open)).on('click', function() {
        var popupNumber = $(this).attr(attributes.popup.open);
        openPopup($(`[${attributes.popup.main}=${popupNumber}]`));
    });
})