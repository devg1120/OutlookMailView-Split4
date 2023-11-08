import SplitView from "./splitview.js";

let $ = function (para) {
  return document.querySelector(para);
};

export class OutLook {
  constructor() {
    this.splitview = new SplitView(); // GS
    this.splitview.activate(document.getElementById("main-container")); // GS

    this.loadData(sampleMailData);
    //sidebarCollapseClick();
    //dropdownClick();
    //hoverMailActionButtons();
    this.bindMailListItemClick();
    //bindEscKey();
  }

  mode_switch(op) {
    console.log("mode_switch", op)
    let ele = document.getElementById("main-container"); // GS
    let list = document.getElementById("list"); // GS
    let content = document.getElementById("content"); // GS
    if( ele.classList.contains('horizontal') ){
        ele.classList.remove('horizontal');
        ele.classList.add('vertical');
	console.log('vertical');
	list.style.width = '100%';
	content.style.width = '100%';

        let mail_infos =  list.querySelectorAll(".mail_info");
	for (const mail_info of mail_infos) {
             //console.log(elem);
	     for (const el of Array.from(mail_info.children)) {
                  //console.log(el);
	        el.classList.add("mail_info_inline_block")
             }
        }

        let sender_images =  list.querySelectorAll(".sender_image");
	for (const sm of sender_images) {
	        sm.classList.remove("sender_image")
	        sm.classList.add("sender_image_inline")
             
        }
/*
        let items =  list.querySelectorAll(".item");
	for (const im of items) {
	        im.classList.remove("item")
	        im.classList.add("item_inline")
        }
*/
    } else if( ele.classList.contains('vertical') ){
        ele.classList.remove('vertical');
        ele.classList.add('horizontal');
	console.log('horizontal');

        let mail_infos =  list.querySelectorAll(".mail_info");
	for (const mail_info of mail_infos) {
             //console.log(elem);
	     for (const el of Array.from(mail_info.children)) {
                  //console.log(el);
	        el.classList.remove("mail_info_inline_block")
             }
        }

        let sender_images =  list.querySelectorAll(".sender_image_inline");
	for (const sm of sender_images) {
	        sm.classList.remove("sender_image_inline")
	        sm.classList.add("sender_image")
             
        }
/*
        let items =  list.querySelectorAll(".item_inline");
	for (const im of items) {
	        im.classList.remove("item_inline")
	        im.classList.add("item")
        }
*/

    }

  }

  bindMailListItemClick() {
    const highlightedItems = document.querySelectorAll("ul.mail_items li");

    highlightedItems.forEach((userItem) => {
      userItem.addEventListener("click", () => {
        this.highlightMailListItem(userItem);
        this.loadMailItem(userItem);
      });
    });
  }

  loadMailItem(listItem) {
    var mail = JSON.parse(listItem.getAttribute("json"));
    var senderImage = listItem.getAttribute("sender-image");
    var senderColor = listItem.getAttribute("sender-color");

    $("#mail_sender_image").style.backgroundColor = senderColor;
    $("#mail_sender_image_span").innerHTML = senderImage;
    $("#mail_subject").innerHTML = mail.subject;
    $("#mail_sender_name").innerHTML = mail.from;
    $("#mail_send_date").innerHTML = mail.sentDate;
    $("#to_name").innerHTML = mail.to;
    $("#mail_body").innerHTML = "<hr>" + mail.summary + "<hr>";

    var strAttachmentsHtml = "";
    for (let i = 0; i < mail.attachments.length; i++) {
      //<img class="attachment_image" src="./img/file_images/{{ATTACHMENT_TYPE}}.svg" onError="this.onerror=null;this.src=\'./img/file_images/file.svg\'"/>\
      //<img class="attachment_image" src="./img/file_images/{{ATTACHMENT_TYPE}}.svg" onError="console.log(\'img load error: {{ATTACHMENT_TYPE}}.svg \');"/>\
      strAttachmentsHtml += '\
     <li>\
         <a href="#">\
             <div class="attachment_info">\
             <img class="attachment_image" src="./img/file_images/{{ATTACHMENT_TYPE}}.svg" onError="this.onerror=null;this.src=\'./img/file_images/file.svg\'"/>\
                 <span>{{ATTACHMENT_NAME}}</span>\
                 <span>{{ATTACHMENT_SIZE}}</span>\
             </div>\
         </a>\
     </li>'
        .replace(
          /{{ATTACHMENT_TYPE}}/g,
          mail.attachments[i].name.split(".").pop(),
        )
        .replace("{{ATTACHMENT_NAME}}", mail.attachments[i].name)
        .replace("{{ATTACHMENT_SIZE}}", mail.attachments[i].size);
    }

    if (mail.attachments.length > 0) {
      $("#mail_attachments").innerHTML = "<ul>" + strAttachmentsHtml + "</ul>";
    }
  }

  highlightMailListItem(listItem) {
    let childs = listItem.parentNode.children;

    for (let i = 0; i < childs.length; i++) {
      childs[i].classList.remove("selected");
    }

    listItem.classList.add("selected");
  }

  indEscKey() {
    $(document).keyup(function (e) {
      if (e.key === "Escape") {
        $(".mail_content").hide();
      }
    });
  }

  dropdownClick() {
    $(".dropdown-menu li a").click(function () {
      var selText = $(this).text();
      $(this)
        .parents(".btn-group")
        .find(".dropdown-toggle")
        .html(selText + ' <span class="caret"></span>');
    });
  }

  hoverMailActionButtons() {
    $(".item.container").hover(
      function () {
        $(this).find(".action_buttons *").toggle();
      },
      function () {
        $(this).find(".action_buttons *").toggle();
      },
    );
  }

  loadData(mails) {
    var $mailItems = $(".mail_items");
    var colors = [
      "#ffb900",
      "#d83b01",
      "#ea4300",
      "#ff8c00",
      "#a80000",
      "#e81123",
      "#5c005c",
      "#b4009e",
      "#e3008c",
      "#32145a",
      "#5c2d91",
      "#b4a0ff",
      "#002050",
      "#00188f",
      "#0078d4",
      "#00bcf2",
      "#004b50",
      "#008272",
      "#00B294",
      "#004b1c",
      "#107c10",
      "#bad80a",
    ];
    var senderColors = {};
    for (var i = 0; i < mails.length; i++) {
      var randomColor = colors[Math.floor(Math.random() * colors.length)];
      senderColors[mails[i].from] =
        senderColors[mails[i].from] == undefined
          ? randomColor
          : senderColors[mails[i].from];
      const li = document.createElement("li");
      li.className = "item containeitem container";
      li.setAttribute("json", JSON.stringify(mails[i]));
      li.setAttribute("sender-image", this.getSenderImageText(mails[i].name));
      li.setAttribute("sender-color", senderColors[mails[i].from]);

      const div1 = document.createElement("div");
      div1.className = "sender_image";
      div1.style.backgroundColor = senderColors[mails[i].from];
      const span = document.createElement("span");
      //span.setAttribute('src',  getSenderImageText(mails[i].name));
      span.innerHTML = this.getSenderImageText(mails[i].name);

      div1.appendChild(span);

      const div2 = document.createElement("div");
      div2.className = "mail_info";
      const div21 = document.createElement("div");
      div21.className = "mail_sender";
      const span21 = document.createElement("span");
      let txt = document.createTextNode(mails[i].name);
      span21.appendChild(txt);
      div21.appendChild(span21);

      const div22 = document.createElement("div");
      div22.className = "mail_subject";
      const span22 = document.createElement("span");
      txt = document.createTextNode(mails[i].subject);
      span22.appendChild(txt);
      div22.appendChild(span22);

      const div23 = document.createElement("div");
      div23.className = "mail_summary";
      const span23 = document.createElement("span");
      txt = document.createTextNode(mails[i].summary);
      span23.appendChild(txt);
      div23.appendChild(span23);

      const div24 = document.createElement("div");
      div24.className = "mail_sent_date";
      const span24 = document.createElement("span");
      txt = document.createTextNode(mails[i].sentDate);
      span24.appendChild(txt);
      div24.appendChild(span24);

      div2.appendChild(div24);
      div2.appendChild(div21);
      div2.appendChild(div22);
      div2.appendChild(div23);

      const div3 = document.createElement("div");
      div3.className = "mail_actions";
      const div31 = document.createElement("div");
      div31.className = "action_buttons";
      const i1 = document.createElement("i");
      i1.className = "ms-Icon ms-Icon--Archive";
      i1.style.display = "none";
      const i2 = document.createElement("i");
      i2.className = "ms-Icon ms-Icon--Delete";
      i2.style.display = "none";
      const i3 = document.createElement("i");
      i3.className = "ms-Icon ms-Icon--Flag";
      i3.style.display = "none";

      div31.appendChild(i1);
      div31.appendChild(i2);
      div31.appendChild(i3);

      const div32 = document.createElement("div");
      div32.className = "mail_sent_data";
      const span32 = document.createElement("span");
      let txt32 = document.createTextNode(mails[i].sentDate);
      span32.appendChild(txt32);

      div3.appendChild(div31);
      div3.appendChild(div32);

      li.appendChild(div1);
      li.appendChild(div2);
      //li.appendChild(div3);

      $mailItems.append(li);
      /*
        $mailItems.append(
            '<li class="item container" data-json=\'{{JSON}}\' data-sender-color="{{SENDER_COLOR}}" data-sender-image="{{SENDER_IMG}}">\
                <div class="sender_image" style="background-color:{{SENDER_COLOR}}">\
                    <span>{{SENDER_IMG}}</span>\
                </div>\
                <div class="mail_info">\
                    <div class="mail_sender">\
                        <span>{{SENDER}}</span>\
                    </div>\
                    <div class="mail_subject">\
                        <span>{{SUBJECT}}</span>\
                    </div>\
                    <div class="mail_summary">{{SUMMARY}}\
                    </div>\
                </div>\
                <div class="mail_actions">\
                    <div class="action_buttons">\
                        {{IMPORTANT}}\
                        {{ATTACHMENT}}\
                        {{REPLY}}\
                        <i style="display:none;" class="ms-Icon ms-Icon--Archive"></i>\
                        <i style="display:none;" class="ms-Icon ms-Icon--Delete"></i>\
                        <i style="display:none;" class="ms-Icon ms-Icon--Flag"></i>\
                    </div>\
                    <div class="mail_sent_date">\
                        <span>{{SENT_DATE}}</span>\
                    </div>\
                </div>\
            </li>'
            .replace(/{{SENDER_IMG}}/g, getSenderImageText(mails[i].name))
            .replace(/{{SENDER_COLOR}}/g, senderColors[mails[i].from])
            .replace('{{SENDER}}', mails[i].name)
            .replace('{{SUBJECT}}', mails[i].subject)
            .replace('{{SUMMARY}}', mails[i].summary.replace(/(<([^>]+)>)/ig,''))
            .replace('{{IMPORTANT}}', mails[i].isImportant ? '<i class="ms-Icon ms-Icon--Important"></i>': '')
            .replace('{{ATTACHMENT}}', mails[i].attachments.length > 0 ? '<i class="ms-Icon ms-Icon--Attach"></i>': '')
            .replace('{{REPLY}}', mails[i].isReplied ? '<i class="ms-Icon ms-Icon--ReplyAlt"></i>': '')
            .replace('{{SENT_DATE}}', mails[i].sentDate)
            .replace('{{JSON}}', JSON.stringify(mails[i]))
            );
	    */
    }
  }

  getSenderImageText(senderName) {
    var removedAlphanumerics = senderName.replace(/\W /g, "");
    var senderParts = removedAlphanumerics.split(" ");
    if (senderParts.length >= 2) {
      return (
        senderParts[0].substring(0, 1).toUpperCase() +
        senderParts[1].substring(0, 1).toUpperCase()
      );
    } else {
      return senderParts[0].substring(0, 1).toUpperCase();
    }
  }
} // end class
