import SplitView from "./splitview.js";

let $ = function (para) {
  return document.querySelector(para);
};

export class OutLook {
  constructor() {
    this.splitview = new SplitView(); // GS
    this.splitview.activate(document.getElementById("main-container")); // GS

    this.items_list = this.loadData(sampleMailData);
    this.items_table = this.loadData2(sampleMailData);
    //this.createResizableTable(this.items_table);

    //sidebarCollapseClick();
    //dropdownClick();
    //hoverMailActionButtons();
    this.bindMailListItemClick();
    //this.bindMailTableItemClick();
    //bindEscKey();
    this.bindKey();
    this.table_mode = false;
    this.item_horizontal_resize_sync = true;

  }

  resizeing(className, width) {
      let mail_infos =  list.querySelectorAll("." + className);
      for (const ele of mail_infos) {
        ele.style.width = width + "px";
      }
  }

  item_horizontal_resize(ele) {
      if ( this.item_horizontal_resize_sync == false) { return}

        const width = ele.getBoundingClientRect().width;
        //const height = ele.getBoundingClientRect().height

      //console.log("item_horizontal_resize",ele.className,width, height);

      if ( ele.classList.contains("mail_sent_date"))  {
              this.resizeing("mail_sent_date", width);

      } else if ( ele.classList.contains("mail_sender"))  {
              this.resizeing("mail_sender", width);

      } else if ( ele.classList.contains("mail_subject"))  {
              this.resizeing("mail_subject", width);

      }

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

		//     el.addEventListener('resize', this.item_horizontal_resize(el));   /* ADD */

                const observer = new MutationObserver(() => {
                  	 this.item_horizontal_resize(el);   /* ADD */
                })
                observer.observe(el, {
                  attriblutes: true,
                  attributeFilter: ["style"]
                })

             }
        }

        let sender_images =  list.querySelectorAll(".sender_image");
	for (const sm of sender_images) {
	        sm.classList.remove("sender_image")
	        sm.classList.add("sender_image_inline")
             
        }

        let items =  list.querySelectorAll(".item");
	for (const im of items) {
	        im.classList.remove("item")
	        im.classList.add("item_inline")
        }

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

        let items =  list.querySelectorAll(".item_inline");
	for (const im of items) {
	        im.classList.remove("item_inline")
	        im.classList.add("item")
        }

        //let list = document.getElementById("list"); // GS
        //let content = document.getElementById("content"); // GS
	list.style.height = "100%";
	content.style.height = "100%";
        this.list_item_select_focus();



    }

  }

  mode_switch2(op) {
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

	    list.removeChild(this.items_list);
	    list.appendChild(this.items_table);
        this.createResizableTable(this.items_table);
       this.bindMailTableItemClick();
	    this.table_mode = true;
/*
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

	    list.removeChild(this.items_table);
	    list.appendChild(this.items_list);
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

        let items =  list.querySelectorAll(".item_inline");
	for (const im of items) {
	        im.classList.remove("item_inline")
	        im.classList.add("item")
        }
	    this.table_mode = false;


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

  bindMailTableItemClick() {
    const highlightedItems = document.querySelectorAll(".mail_items_table tr");
    highlightedItems.forEach((userItem) => {
      if ( userItem.classList.contains('item') ) {
          userItem.addEventListener("click", () => {
            this.highlightMailTableItem(userItem);
            this.loadMailItem(userItem);
          });
      }
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
    } else {
      $("#mail_attachments").innerHTML = "" ;
    }
  }

  highlightMailListItem(listItem) {
    let childs = listItem.parentNode.children;

    for (let i = 0; i < childs.length; i++) {
      childs[i].classList.remove("selected");
    }

    listItem.classList.add("selected");
  }

  highlightMailTableItem(listItem) {
	  
    let childs = listItem.parentNode.children;

    for (let i = 0; i < childs.length; i++) {
      childs[i].classList.remove("selected");
    }

    listItem.classList.add("selected");
  }


  bindEscKey() {
    $(document).keyup(function (e) {
      if (e.key === "Escape") {
        $(".mail_content").hide();
      }
    });
  }

  bindKey() {
    let list = document.getElementById("list"); // GS
    list.contentEditable = true;
    list.addEventListener(
      "keydown",
      (event) => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
        console.log(event.key);
    
        switch (event.key) {
          case "Down": // IE/Edge specific value
          case "ArrowDown":
            // Do something for "down arrow" key press.
            this.list_item_select_down();
            break;
          case "Up": // IE/Edge specific value
          case "ArrowUp":
            // Do something for "up arrow" key press.
            this.list_item_select_up();
            break;
          case "Left": // IE/Edge specific value
          case "ArrowLeft":
            // Do something for "left arrow" key press.
            break;
          case "Right": // IE/Edge specific value
          case "ArrowRight":
            // Do something for "right arrow" key press.
            break;
          case "Enter":
            // Do something for "enter" or "return" key press.
            break;
          case "Esc": // IE/Edge specific value
          case "Escape":
            // Do something for "esc" key press.
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }
    
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
	event.stopPropagation();
      },
      false,
    );

  }

  list_item_select_down() {
    if (this.table_mode) { this.table_item_select_down(); return }

    //console.log("item_down");
    //const list = document.querySelector("ul.mail_items");
    //const listTop = list.getBoundingClientRect().top;
    const highlightedItems = document.querySelectorAll("ul.mail_items li");
    for (const userItem of highlightedItems) {
	    if (userItem.classList.contains("selected")) {
                let next_item = userItem.nextElementSibling;
                if (next_item != null) {
                 //console.log(next_item.getBoundingClientRect().top);
                 //list.scrollTop = next_item.getBoundingClientRect().top ;
                 this.highlightMailListItem(next_item);
                 this.loadMailItem(next_item);
		 next_item.scrollIntoView({
                   behavior: "smooth",
		   block: "center",
                 });
		}
		break;
	    }
    }
  }

  list_item_select_up() {
    if (this.table_mode) { this.table_item_select_up(); return }
    //console.log("item_up");
    //let list = document.getElementById("list"); // GS
    const highlightedItems = document.querySelectorAll("ul.mail_items li");
    for (const userItem of highlightedItems) {
	    if (userItem.classList.contains("selected")) {
                //console.log(userItem);
                let next_item = userItem.previousElementSibling;
                if (next_item != null) {
                 this.highlightMailListItem(next_item);
                 this.loadMailItem(next_item);
		 next_item.scrollIntoView({
                   behavior: "smooth",
		   block: "center",
                 });
		}
		break;
	    }
    }

  }

  list_item_select_focus() {
    if (this.table_mode) {  return }

    const highlightedItems = document.querySelectorAll("ul.mail_items li");
    for (const userItem of highlightedItems) {
	    if (userItem.classList.contains("selected")) {
                let next_item = userItem.nextElementSibling;
                if (next_item != null) {
                 //this.highlightMailListItem(next_item);
                 //this.loadMailItem(next_item);
		 next_item.scrollIntoView({
                   behavior: "smooth",
		   block: "center",
                 });
		}
		break;
	    }
    }
  }


  table_item_select_down() {
    //console.log("item_down");
    //const list = document.querySelector("ul.mail_items");
    //const listTop = list.getBoundingClientRect().top;
    const highlightedItems = document.querySelectorAll(".mail_items_table tr");
    for (const userItem of highlightedItems) {
	    if (userItem.classList.contains("selected")) {
                let next_item = userItem.nextElementSibling;
                if (next_item != null) {
                 //console.log(next_item.getBoundingClientRect().top);
                 //list.scrollTop = next_item.getBoundingClientRect().top ;
                 this.highlightMailListItem(next_item);
                 this.loadMailItem(next_item);
		 next_item.scrollIntoView({
                   behavior: "smooth",
		   block: "center",
                 });
		}
		break;
	    }
    }
  }

  table_item_select_up() {
    //console.log("item_up");
    //let list = document.getElementById("list"); // GS
    const highlightedItems = document.querySelectorAll(".mail_items_table tr");
    for (const userItem of highlightedItems) {
	    if (userItem.classList.contains("selected")) {
                //console.log(userItem);
                let next_item = userItem.previousElementSibling;
                if (next_item != null) {
                 this.highlightMailListItem(next_item);
                 this.loadMailItem(next_item);
		 next_item.scrollIntoView({
                   behavior: "smooth",
		   block: "center",
                 });
		}
		break;
	    }
    }

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
      return $mailItems;
  }

 convertHTML2A(str) {
    return str.replace(/<[^>]+>/g, '');

}

  loadData2(mails) {
    //var $mailItems_table = $(".mail_items_table");
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

    var basediv = document.createElement('div');
    basediv.style.width = '100%';
    basediv.style.height = '100%';
    basediv.style.overflow = 'auto';

    
    var table = document.createElement('table');
    table.classList.add("mail_items_table")
    basediv.appendChild(table);

    var senderColors = {};

    var tr = document.createElement('tr');
      //tr.style = "display: flex;";
      var th = ""
      th =  document.createElement('th');
      th.textContent = "NN";
      th.style.width = "40px";
      //th.style.width = "5%";
      tr.appendChild(th);
      th =  document.createElement('th');
      th.textContent = "Date";
      th.style.width = "180px";
      //th.style.width = "20%";
      tr.appendChild(th);
      th =  document.createElement('th');
      th.textContent = "Sender";
      th.style.width = "250px";
      //th.style.width = "20%";
      tr.appendChild(th);
      th =  document.createElement('th');
      th.textContent = "Subject";
      th.style.width = "400px";
      //th.style.width = "40%";
      tr.appendChild(th);
      th =  document.createElement('th');
      th.textContent = "Summary";
      //th.style.width = "999px";
      //th.style.width = "100%";
      //th.style.width = "999px";
      //th.style.width = "calc(100% - 780px)";
      //th.style = "flex-grow: 1;";
      tr.appendChild(th);

    table.appendChild(tr);

    for (var i = 0; i < mails.length; i++) {

      var tr = document.createElement('tr');

      var randomColor = colors[Math.floor(Math.random() * colors.length)];
      senderColors[mails[i].from] =
        senderColors[mails[i].from] == undefined
          ? randomColor
          : senderColors[mails[i].from];

      //const li = document.createElement("li");
      tr.className = "item containeitem container";
      tr.setAttribute("json", JSON.stringify(mails[i]));
      tr.setAttribute("sender-image", this.getSenderImageText(mails[i].name));
      tr.setAttribute("sender-color", senderColors[mails[i].from]);

      const div1 = document.createElement("div");
      div1.className = "sender_image";
      div1.style.backgroundColor = senderColors[mails[i].from];
      const span = document.createElement("span");
      span.innerHTML = this.getSenderImageText(mails[i].name);
      div1.appendChild(span);
      var th = document.createElement('td');
      th.appendChild(div1);
      tr.appendChild(th);

      const div24 = document.createElement("div");
      div24.className = "mail_sent_date";
      const span24 = document.createElement("span");
      let txt = document.createTextNode(mails[i].sentDate);
      span24.appendChild(txt);
      div24.appendChild(span24);
      th = document.createElement('td');
      th.appendChild(div24);
      tr.appendChild(th);

      //const div2 = document.createElement("div");
      //div2.className = "mail_info";
      const div21 = document.createElement("div");
      div21.className = "mail_sender";
      const span21 = document.createElement("span");
      txt = document.createTextNode(mails[i].name);
      span21.appendChild(txt);
      div21.appendChild(span21);
      th = document.createElement('td');
      th.appendChild(div21);
      tr.appendChild(th);

      const div22 = document.createElement("div");
      div22.className = "mail_subject";
      const span22 = document.createElement("span");
      txt = document.createTextNode(mails[i].subject);
      span22.appendChild(txt);
      div22.appendChild(span22);
      th = document.createElement('td');
      th.appendChild(div22);
      tr.appendChild(th);

/*
      const div22 = document.createElement("div");
      div22.className = "mail_subject";
      //const span22 = document.createElement("span");
      div22.innerHTML = mails[i].subject;
      //span22.appendChild(txt);
      //div22.appendChild(txt);
      txt = document.createTextNode(mails[i].subject);
      th = document.createElement('td');
      //th.value = mails[i].subject;
      th.appendChild(txt);
      tr.appendChild(th);
	*/    
      const div23 = document.createElement("div");
      div23.className = "mail_summary";
      const span23 = document.createElement("span");
      //txt = document.createTextNode(mails[i].summary.substring(0,34));
      txt = document.createTextNode(this.convertHTML2A(mails[i].summary.substring(0,34)));
      span23.appendChild(txt);
      //span23.innerHTML = mails[i].summary;
      div23.appendChild(span23);
      th = document.createElement('td');
      th.appendChild(div23);
      tr.appendChild(th);

/*
      const div24 = document.createElement("div");
      div24.className = "mail_sent_date";
      const span24 = document.createElement("span");
      txt = document.createTextNode(mails[i].sentDate);
      span24.appendChild(txt);
      div24.appendChild(span24);
      th = document.createElement('td');
      th.appendChild(div24);
      tr.appendChild(th);
*/
      table.appendChild(tr);
    }

    //return table;
	  return basediv;
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


  createResizableTable(table) {
        let that = this;
        const cols = table.querySelectorAll('th');
        [].forEach.call(cols, function (col) {
            // Add a resizer element to the column
            const resizer = document.createElement('div');
            resizer.classList.add('resizer');

            // Set the height
            resizer.style.height = table.offsetHeight + 'px';
            //resizer.style.height =  '50px';
            //resizer.style.width =  '5px';

            col.appendChild(resizer);

            that.createResizableColumn(col, resizer);
        });
    };

   createResizableColumn(col, resizer) {
        let x = 0;
        let w = 0;

        const mouseDownHandler = function (e) {
		console.log("mouseDownHandler");
            x = e.clientX;

            const styles = window.getComputedStyle(col);
            w = parseInt(styles.width, 10);

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);

            resizer.classList.add('resizing');
        };

        const mouseMoveHandler = function (e) {
            const dx = e.clientX - x;
            col.style.width = (w + dx) + 'px';
        };

        const mouseUpHandler = function () {
            resizer.classList.remove('resizing');
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        resizer.addEventListener('mousedown', mouseDownHandler);
    };






} // end class
