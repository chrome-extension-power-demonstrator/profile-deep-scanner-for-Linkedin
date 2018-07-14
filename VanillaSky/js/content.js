chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    var embeddingScript = document.createElement("script");
    var className = "manual_script";
    embeddingScript.type = "text/javascript";    
    embeddingScript.classList.add(className);
    
    if (msg.text == 'get_summary_info') { 
        embeddingScript.text = 'if (document.getElementsByClassName("pv-top-card-section__summary-toggle-button").length > 0){document.getElementsByClassName("pv-top-card-section__summary-toggle-button")[0].click();}';
        document.getElementsByTagName("body")[0].appendChild(embeddingScript);
        sendResponse({data: document.body.innerHTML, info: msg.text});
    } else if (msg.text == 'get_pos_info') {
        embeddingScript.text = 'if (document.getElementsByClassName("pv-experience-section__see-more").length > 0 && (document.getElementsByClassName("pv-experience-section__see-more")[0]).getElementsByClassName("pv-profile-section__see-more-inline").length > 0){(document.getElementsByClassName("pv-experience-section__see-more")[0]).getElementsByClassName("pv-profile-section__see-more-inline")[0].click();}';
        document.getElementsByTagName("body")[0].appendChild(embeddingScript);
        sendResponse({data: document.body.innerHTML, info: msg.text});
    } else if (msg.text == 'get_contact_info') {
        embeddingScript.text = 'if (document.getElementsByClassName("pv-top-card-v2-section__link--contact-info").length > 0){document.getElementsByClassName("pv-top-card-v2-section__link--contact-info")[0].click();}';
        document.getElementsByTagName("body")[0].appendChild(embeddingScript);
        sendResponse({data: document.body.innerHTML, info: msg.text});
    } else if (msg.text == 'close_contact_info') {
        embeddingScript.text = 'if (document.getElementsByClassName("artdeco-dismiss").length > 0){document.getElementsByClassName("artdeco-dismiss")[0].click();}';
        document.getElementsByTagName("body")[0].appendChild(embeddingScript);
        sendResponse({data: document.body.innerHTML, info: 'get_expanded_pos_info'});
    } else if (msg.text == 'delete_scripts'){
        var elements = document.getElementsByClassName(className);
        for (var i = 0 ; i < elements.length ; i ++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
        sendResponse({data: "", info: msg.text});
    }
});


