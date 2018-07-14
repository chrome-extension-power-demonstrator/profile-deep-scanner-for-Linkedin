document.addEventListener('DOMContentLoaded', function(){
    // extracting all infos here
    function extractUserInfo(freeDomains) {
        var hostName = getHostName(getItem("url"));
        
        var dom1 = jQuery.parseHTML(getItem("data1"));
        var dom2 = jQuery.parseHTML(getItem("data2"));
        var dom3 = jQuery.parseHTML(getItem("data3"));
        
        var tbodyCode = "";
        
        // extracting contact info
        // this is for user name
        tbodyCode += "<tr><td>name</td><td>" + $(dom1).find(".pv-top-card-section__name").first().html() + "</td></tr>";
        
        // this is for user emails
        var email = "";        
        
        if ($(dom3).find(".ci-email").length > 0) {
            for (var i = 0 ; i < $(dom3).find(".ci-email").first().find("a").length ; i ++) {
                var emailString = $(dom3).find(".ci-email").first().find("a").eq(i).html();
                var arrEmailComponents = emailString.split("@");
                var emailDomain = arrEmailComponents[1];
                email += "<tr><td>email_address" + (i == 0 ? "" : ("_" + (i + 1))) + "</td><td>" + emailString + "</td></tr>";
                email += "<tr><td>email_address_type</td><td>" + (freeDomains.includes(emailDomain.trim()) ? "P" : "B") + "</td></tr>";
            }             
        } else {
            email += "<tr><td>email_address</td><td></td></tr>";
            email += "<tr><td>email_address_type</td><td></td></tr>";
        }
         
        tbodyCode += email;

        // this is for user web sites
        var website = "";
        
        if ($(dom3).find(".ci-websites").length > 0) {
            for (var i = 0 ; i < $(dom3).find(".ci-websites").first().find("a").length ; i ++) {
                website += "<tr><td>web_site" + (i == 0 ? "" : ("_" + (i + 1))) + "</td><td>" + $(dom3).find(".ci-websites").first().find("a").eq(i).html() + "</td></tr>";
            }             
        } else {
            website += "<tr><td>web_site</td><td></td></tr>";
        }
        
        tbodyCode += website;                                   
        
        // this is for user linkedin url   
        tbodyCode += "<tr><td>linkedin_url</td><td>" + $(dom3).find(".ci-vanity-url").first().find("a").first().html() + "</td></tr>";
        // this is for user business region
        tbodyCode += "<tr><td>business_region</td><td>" + $(dom1).find(".pv-top-card-section__location").first().html() + "</td></tr>";
        tbodyCode += "<tr><td>profile_picture_url</td><td>Additional page open</td></tr>";
        
        // this is for user biography
//        var biography = "";
//        $(dom).find(".lt-line-clamp__line").each(function( i ) {
//            biography += $(this).html();
//        });        
        
        tbodyCode += "<tr><td>biography</td><td>" + $(dom1).find(".pv-top-card-section__summary-text").first().html() + "</td></tr>";

        // extracting user education histories
        var education = "";                                         
        
        for (var i = 0 ; i < $(dom1).find(".pv-entity__school-name").length ; i ++) {
            education += "<tr><td>education_" + (i == 0 ? "" : ((i + 1) + "_")) + "school</td><td>" + $(dom1).find(".pv-entity__school-name").eq(i).html() + "</td></tr>";
            education += "<tr><td>education_" + (i == 0 ? "" : ((i + 1) + "_")) + "start_year</td><td>" + $(dom1).find(".pv-education-entity").eq(i).find("time").eq(0).html() + "</td></tr>";            
            education += "<tr><td>education_" + (i == 0 ? "" : ((i + 1) + "_")) + "end_year</td><td>" + $(dom1).find(".pv-education-entity").eq(i).find("time").eq(1).html() + "</td></tr>";            
        }       
         
        tbodyCode += education;
        
        // extracting user employer history
        var position = "";                                         
        
        for (var i = 0 ; i < $(dom2).find(".pv-position-entity").length ; i ++) {
            position += "<tr><td>position_" + (i == 0 ? "" : ((i + 1) + "_")) + "title</td><td>" + $(dom2).find(".pv-position-entity").eq(i).find(".pv-entity__summary-info").find("h3").first().html() + "</td></tr>";
            position += "<tr><td>position_" + (i == 0 ? "" : ((i + 1) + "_")) + "company</td><td>" + $(dom2).find(".pv-position-entity").eq(i).find(".pv-entity__secondary-title").first().html() + "</td></tr>";
            position += "<tr><td>company_" + (i == 0 ? "" : ((i + 1) + "_")) + "logo</td><td>Additional page open</td></tr>";
            position += "<tr><td>company_" + (i == 0 ? "" : ((i + 1) + "_")) + "LI_URL</td><td>linkedin.com" + $(dom2).find(".pv-position-entity").eq(i).find("a").first().attr("href") + "</td></tr>";
            position += "<tr><td>company_" + (i == 0 ? "" : ((i + 1) + "_")) + "description</td><td></td></tr>";
            position += "<tr><td>company_" + (i == 0 ? "" : ((i + 1) + "_")) + "website</td><td></td></tr>";
            position += "<tr><td>company_" + (i == 0 ? "" : ((i + 1) + "_")) + "headquarters</td><td></td></tr>";
            position += "<tr><td>company_" + (i == 0 ? "" : ((i + 1) + "_")) + "yearfounded</td><td></td></tr>";
            position += "<tr><td>company_" + (i == 0 ? "" : ((i + 1) + "_")) + "type</td><td></td></tr>";
            position += "<tr><td>company_" + (i == 0 ? "" : ((i + 1) + "_")) + "size</td><td></td></tr>";
            position += "<tr><td>company_" + (i == 0 ? "" : ((i + 1) + "_")) + "specialties</td><td></td></tr>";
            
            var dateString = $(dom2).find(".pv-entity__date-range").eq(i).find("span").eq(1).html();
            var arrDateStringComponents = dateString.split(" ");            
            
            position += "<tr><td>position_" + (i == 0 ? "" : ((i + 1) + "_")) + "start_month</td><td>" + arrDateStringComponents[0] + "</td></tr>";
            position += "<tr><td>position_" + (i == 0 ? "" : ((i + 1) + "_")) + "start_year</td><td>" + arrDateStringComponents[1] + "</td></tr>";
        }       
         
        tbodyCode += position;
        
        $('#tbody-content').html(tbodyCode);
        $("#div-message").html("");  
    }
    
    function getFreeDomains() {
        chrome.runtime.getPackageDirectoryEntry(function(root) {
            root.getFile("csv/domains.csv", {}, function(fileEntry) {
                fileEntry.file(function(file) {
                  var reader = new FileReader();
                  reader.onloadend = function(e) {
                      extractUserInfo(this.result); 
                  };
                  reader.readAsText(file);
                }, function (err, data) {
                });
            }, function (err, data) {
            });
        });
    }
    
    function getHostName(url) {
        var parser = document.createElement('a');
        parser.href = url;

        return parser.origin;
    }
    
    function getItem(key) {
        var value;
        try {
            value = window.localStorage.getItem(key);
        }catch(e) {
            value = "null";
        }
        return value;
    }
    
    function setItem(key, value) {
        try {
          window.localStorage.removeItem(key);
          window.localStorage.setItem(key, value);
        }catch(e) {
        }
    } 
 
    function dismissWithMessage(msg) {
        $("#div-message").html(msg);
        for (var opacity = 1.0; opacity >= 0.0; opacity = opacity - 0.1) {
            var timer = setTimeout(function(){
                document.body.style.opacity = opacity;
                clearTimeout(timer);
                if (opacity <= 0.1) {
                    window.close();
                }
            },3000);                       
        }      
    }

    function doStuffWithDom(response) {
//        saveAsFile(response.info + response.data);
        if (response == null) {
            dismissWithMessage("Something went wrong. Please try again later.");
            return;
        }
    
        if (response.info == "delete_scripts") {
            doRequestProfileInfoWith("get_summary_info", 100);    
        } else if (response.info == "get_summary_info") {
            setItem("data1", response.data);
            doRequestProfileInfoWith("get_pos_info", 500);    
        } else if (response.info == "get_pos_info") {
            doRequestProfileInfoWith("get_contact_info", 1000);    
        } else if (response.info == "get_contact_info") {
            setItem("data3", response.data);
            doRequestProfileInfoWith("close_contact_info", 1000);
        } else if (response.info == "get_expanded_pos_info") {
            setItem("data2", response.data);
            getFreeDomains();
        }
        
//    chrome.tabs.create({url: chrome.extension.getURL('background.html')});
//    saveAsFile(response.data); 
    }

    function doRequestProfileInfoWith(info, delay) {
        var timer = setTimeout(function(){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var tab = tabs[0];
                if (tab.url.includes("https://www.linkedin.com/in")){
                    chrome.tabs.sendMessage(tab.id, {text: info, url: tab.url}, doStuffWithDom); 
                } else {
                    dismissWithMessage("Not a profile page");
                }
            });
            
            clearTimeout(timer);
        }, delay);    
    }

    function saveAsFile(domContent) {
        var d = new Date() + ".txt"; 
        var textToSave =  domContent; 
        var hiddenElement = document.createElement('a'); 
        hiddenElement.href = 'data:attachment/text,' +  encodeURI(textToSave); 
        hiddenElement.target = '_blank';   
        hiddenElement.download = d;    
        hiddenElement.click();
    }
   
    $("#div-message").html("Parsing page...");  
    doRequestProfileInfoWith("delete_scripts", 100);
});

