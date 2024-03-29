
var date = new Date();



function zero_pad( num) {
 var ret = ( '000' + num ).slice( -2 );
 return ret;

}

function getdate( period ) {
   var newdate = new Date(date.getTime());
   newdate.setDate(newdate.getDate() + period);
   return newdate;
}

function date_format( date ) {

var yyyy = date.getFullYear(); // 西暦を取得
var mm = date.getMonth() + 1;  // 月を取得（返り値は実際の月-1なので、+1する）
var dd = date.getDate(); // 日を取得
var w = date.getDay();   // 曜日を取得（数値）
 
var h = zero_pad(date.getHours());
var m = zero_pad(date.getMinutes());
var s = zero_pad(date.getSeconds());

// 月と日が一桁の場合は先頭に0をつける
if (mm < 10) {
    mm = "0" + mm;
}
if (dd < 10) {
    dd = "0" + dd;
}
 
// 曜日を数値から文字列に変換するための配列
week = ["日", "月", "火", "水", "木", "金", "土"];  
 
var result = yyyy + "年" + mm + "月" + dd + "日" + "(" + week[w] + ")" + " " + h +":" + m + ":" + s;



 return result;

}

var sampleMailData = [
  {
    id: 1,
    isImportant: true,
    isReplied: false,
    attachments: [
      {
        name: "manual.pdf",
        size: "1.26 MB",
      },
      {
        name: "report.xls",
        size: "1.26 MB",
      },
      {
        name: "report.asd",
        size: "1.26 MB",
      },
    ],
    //sentDate: "Pzt 16:47",
    sentDate: date_format(date),
    to: "ozcanzaferayan@gmail.com",
    name: "ByPeople & ShockFamily",
    from: "bp@bypeople.com",
    subject: "30 day business growth course",
    summary:
      "Hi, I noticed you were interested in learning more about growing --Company=your business--. I would like to invite you to our free 30 day business growth course. Or, you can signup for a free complimentary 45 minute session for being such a valuable contributor to our Facebook community. <br><br>Just to confirm, is this your first time starting a business, or have you done it before?<br><br>	 	<br>Jenny Smith<br>Business Development at COG<br><br><br>COG Inc<br>589​ Howard​ Street​<br>San Francisco,​ CA​ 94105​<br>unsubscribe<br>",
  },
  {
    id: 2,
    isImportant: false,
    isReplied: false,
    attachments: [],
    //sentDate: date.toLocaleString("ja"),
    sentDate: date_format(getdate(-1)),
    to: "ozcanzaferayan@gmail.com",
    name: "Burgeon Brown",
    from: "burgeonjgdrjrgxhdum@hotmail.com",
    subject: "Congratulations on signing up for Flight School",
    summary:
      "Thanks for joining our free community for marketers. Were excited to share everything that we know about marketing, automation, and growing your business.<br><br><br> 	<br>Jenny Smith<br>Community Manager at COG<br><br><br> 	<br>Attend your first event<br>Take part in our free community. Connect with like minded marketers to exchange ideas. Learn more<br> <br><br><br> 	<br>Complete your first Flight Plan<br>Flight plans are best practice methodologies to succeed with marketing automation faster. Learn more<br> <br><br><br> 	<br>Invite your friends<br>Our community is only as good as its members. Share Flight School with your friends. Learn more<br> <br>Get a 20% discount on your Schoolforce ticket<br>Exclusive to Flight School members, receive a 20% discount on your Schoolforce ticket when you use the coupon code FLIGHTSCHOOL.<br>Buy Ticket<br><br><br>COG Inc<br>589​ Howard​ Street​<br>San​ Francisco,​ CA​ 94105​<br>unsubscribe<br>",
  },
  {
    id: 3,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-3)),
    to: "ozcanzaferayan@gmail.com",
    name: "James Smith",
    from: "james@intelitmedia.com",
    subject: "Enjoy our latest article",
    summary:
      "7 Lead Nurturing Secrets To Turn Strangers Into Customers<br>B2B research consistently shows that 30-50% of leads are not ready to buy when they first inquire about your business, but about three quarters of these leads will become sales ready within 12 to 18 months.<br><br>Read now<br>	 	<br>Jenny Smith<br>Business Development at COG<br><br><br>COG Inc<br>589​ Howard​ Street​<br>San Francisco,​ CA​ 94105​<br>unsubscribe<br>",
  },
  {
    id: 4,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-10)),
    to: "ozcanzaferayan@gmail.com",
    name: "Jonathan Williams",
    from: "JonathanWilliams@windx.net.br",
    subject: "What’s new in August",
    summary:
      "What’s new in August<br>	<br>7 Lead Nurturing Secrets To Turn Strangers Into Customers<br>B2B research consistently shows that 30-50% of leads are not ready to buy when they first inquire about your business, but about three quarters of these leads will become sales ready within 12 to 18 months.<br><br>Read now<br><br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br> <br> <br><br> <br><br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br> <br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br> <br> <br><br> <br><br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br> <br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br> <br> <br><br> <br><br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br>Thanks for being a subscriber. You can view more articles on our blog.<br>	 	<br>Jenny Smith<br>Business Development at COG<br><br><br>COG Inc<br>589​ Howard​ Street​<br>San Francisco,​ CA​ 94105​<br>unsubscribe<br><br>",
  },
  {
    id: 5,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-10)),
    to: "ozcanzaferayan@gmail.com",
    name: "Pensile Pateraupma",
    from: "pensilepateraupma@hotmail.com",
    subject: "We have just released our API & SDK.",
    summary:
      "We wanted you to be the first to know, we have just released our API & SDK.<br>Our free community for marketers! Were excited to share everything that we know about marketing, automation, and growing your business.<br><br>We hope you enjoy the content as much as we did creating it. Drawing from decades of experience using marketing automation and trying out all sorts of techniques, its peppered with real life examples and practical takeaways.<br><br>Sign me up<br>	 	<br>Jenny Smith<br>Business Development at COG<br><br><br>COG Inc<br>589​ Howard​ Street​<br>San Francisco,​ CA​ 94105​<br>unsubscribe<br>",
  },
  {
    id: 6,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-15)),
    to: "ozcanzaferayan@gmail.com",
    name: "Greg Roberts",
    from: "GregRoberts@avantel.ru",
    subject: "The course covers all of the basics",
    summary:
      "I noticed you were interested in learning more about growing --Company=your business--. I would like to invite you to our free 30 day business growth course.<br><br>The course covers all of the basics youll need to get up and running. So, what are you waiting for?<br><br>Register<br>COG Inc<br>589 Howard Street<br>San Francisco, CA 94105<br>unsubscribe<br><br>",
  },
  {
    id: 7,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-15)),
    to: "ozcanzaferayan@gmail.com",
    name: "SERVICE.COLIS@DHL.FR",
    from: "SERVICE.COLIS@DHL.FR",
    subject: "SEO at Low Cost ?",
    summary:
      'Hello,<br> <br>“Have you thought about hiring an offshore help and then decided not to go that path because of horror stories?”<br> <br>In last 3 months we have started working with 10 Digital Marketing agencies and they love our work. Which is why I have decided to approach more because I believe that what my team can help you scale your business just like we are helping others? We handle SEO, SMO, PPC, Facebook advertising, Twitter and LinkedIn marketing, content marketing, brand reputation management.<br> <br>Quick Note: we are 125+ team, running 300+ projects.<br> <br>Here is what I am offering:<br>1.       15 day free trial on 3 projects.(Ofcourse we need to talk first and I need to know that you are serious)<br>2.       Free Audit Report: We analyze and send you a free audit report of websites; these reports point out all the weak areas to be focused on.<br>3.       We use Basecamp to manage our projects. You will see project management like never before.<br>4.       We use tier link building approach in SEO. 1st tier links to money site, 2nd tier links to 1st tier links and so on. You know how it is.<br>5.       No compromise here. We build at least 2-3 backlinks per project every single day.<br>6.       We build links from sites with PA, DA > 15. No low quality junk spam.<br> <br>Our All Services:SEO | PPC | SMO | SMM | Website and Mobile App Design& Development.<br> <br>I can send you our past work details, company information and an affordable quotation with the best offer. Please reply to this email with your Skype or Phone number.<br> <br>Interested and want to give it a shot?Let’s hop on a quick Skype/Phone call. I am sure you will love us (100% sure).<br> <br>Please reply to this email with your Skype or Phone number.<br> <br>Cheers,<br>James Smith<br>Business Development Executive<br> <br>"Your success is our success"',
  },
  {
    id: 8,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-15)),
    to: "ozcanzaferayan@gmail.com",
    name: "ByPeople & ShockFamily",
    from: "bp@bypeople.com",
    subject: "30 day business growth course",
    summary:
      "Hi, I noticed you were interested in learning more about growing --Company=your business--. I would like to invite you to our free 30 day business growth course. Or, you can signup for a free complimentary 45 minute session for being such a valuable contributor to our Facebook community. <br><br>Just to confirm, is this your first time starting a business, or have you done it before?<br><br>	 	<br>Jenny Smith<br>Business Development at COG<br><br><br>COG Inc<br>589​ Howard​ Street​<br>San Francisco,​ CA​ 94105​<br>unsubscribe<br>",
  },
  {
    id: 9,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-15)),
    to: "ozcanzaferayan@gmail.com",
    name: "Burgeon Brown",
    from: "burgeonjgdrjrgxhdum@hotmail.com",
    subject: "Congratulations on signing up for Flight School",
    summary:
      "Thanks for joining our free community for marketers. Were excited to share everything that we know about marketing, automation, and growing your business.<br><br><br> 	<br>Jenny Smith<br>Community Manager at COG<br><br><br> 	<br>Attend your first event<br>Take part in our free community. Connect with like minded marketers to exchange ideas. Learn more<br> <br><br><br> 	<br>Complete your first Flight Plan<br>Flight plans are best practice methodologies to succeed with marketing automation faster. Learn more<br> <br><br><br> 	<br>Invite your friends<br>Our community is only as good as its members. Share Flight School with your friends. Learn more<br> <br>Get a 20% discount on your Schoolforce ticket<br>Exclusive to Flight School members, receive a 20% discount on your Schoolforce ticket when you use the coupon code FLIGHTSCHOOL.<br>Buy Ticket<br><br><br>COG Inc<br>589​ Howard​ Street​<br>San​ Francisco,​ CA​ 94105​<br>unsubscribe<br>",
  },
  {
    id: 10,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-15)),
    to: "ozcanzaferayan@gmail.com",
    name: "James Smith",
    from: "james@intelitmedia.com",
    subject: "Enjoy our latest article",
    summary:
      "7 Lead Nurturing Secrets To Turn Strangers Into Customers<br>B2B research consistently shows that 30-50% of leads are not ready to buy when they first inquire about your business, but about three quarters of these leads will become sales ready within 12 to 18 months.<br><br>Read now<br>	 	<br>Jenny Smith<br>Business Development at COG<br><br><br>COG Inc<br>589​ Howard​ Street​<br>San Francisco,​ CA​ 94105​<br>unsubscribe<br>",
  },
  {
    id: 11,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-15)),
    to: "ozcanzaferayan@gmail.com",
    name: "Jonathan Williams",
    from: "JonathanWilliams@windx.net.br",
    subject: "What’s new in August",
    summary:
      "What’s new in August<br>	<br>7 Lead Nurturing Secrets To Turn Strangers Into Customers<br>B2B research consistently shows that 30-50% of leads are not ready to buy when they first inquire about your business, but about three quarters of these leads will become sales ready within 12 to 18 months.<br><br>Read now<br><br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br> <br> <br><br> <br><br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br> <br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br> <br> <br><br> <br><br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br> <br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br> <br> <br><br> <br><br><br>Title of article goes here<br>This is a brief teaser of the article that youre featuring.<br>Read now<br>Thanks for being a subscriber. You can view more articles on our blog.<br>	 	<br>Jenny Smith<br>Business Development at COG<br><br><br>COG Inc<br>589​ Howard​ Street​<br>San Francisco,​ CA​ 94105​<br>unsubscribe<br><br>",
  },
  {
    id: 12,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-15)),
    to: "ozcanzaferayan@gmail.com",
    name: "Pensile Pateraupma",
    from: "pensilepateraupma@hotmail.com",
    subject: "We have just released our API & SDK.",
    summary:
      "We wanted you to be the first to know, we have just released our API & SDK.<br>Our free community for marketers! Were excited to share everything that we know about marketing, automation, and growing your business.<br><br>We hope you enjoy the content as much as we did creating it. Drawing from decades of experience using marketing automation and trying out all sorts of techniques, its peppered with real life examples and practical takeaways.<br><br>Sign me up<br>	 	<br>Jenny Smith<br>Business Development at COG<br><br><br>COG Inc<br>589​ Howard​ Street​<br>San Francisco,​ CA​ 94105​<br>unsubscribe<br>",
  },
  {
    id: 13,
    isImportant: false,
    isReplied: false,
    attachments: [],
    sentDate: date_format(getdate(-15)),
    to: "ozcanzaferayan@gmail.com",
    name: "Greg Roberts",
    from: "GregRoberts@avantel.ru",
    subject: "The course covers all of the basics",
    summary:
      "I noticed you were interested in learning more about growing --Company=your business--. I would like to invite you to our free 30 day business growth course.<br><br>The course covers all of the basics youll need to get up and running. So, what are you waiting for?<br><br>Register<br>COG Inc<br>589 Howard Street<br>San Francisco, CA 94105<br>unsubscribe<br><br>",
  },
];
