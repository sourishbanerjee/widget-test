function debounce(func, delay) {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

function removeHtmlAndLimitSentences(str) {
  const noHtml = str.replace(/<[^>]*>/g, "");

  if (/[.!?]/.test(noHtml)) {
    const sentences = noHtml.match(/[^.!?]+[.!?]+/g) || [];
    return sentences.slice(0, 2).join(" ");
  } else {
    return noHtml;
  }
}

function BooleanWatcher(initialValue, onChange) {
  let _value = initialValue;

  this.getValue = function () {
    return _value;
  };

  this.setValue = function (newValue) {
    if (newValue !== _value) {
      _value = newValue;
      onChange(newValue);
    }
  };
}

function NumberWatcher(initialValue, onChange) {
  let _value = initialValue;

  this.getValue = function () {
    return _value;
  };

  this.setValue = function (newValue) {
    _value = newValue;
    onChange(newValue);
  };
}

const urlFormater = (text) => {
  return text?.toLowerCase()?.trimEnd()?.trimEnd()?.split(" ")?.join("-");
};

(function () {
  let css = `
        .widget-main {

        }

        .widget-main-button {
            z-index: 9999;
            position: fixed;
            bottom: 42px;
            right: 56px;
            background-color: #504DE5;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: none;
            outline: none;
            cursor: pointer;
            color: white;
            font-size: 26px;
            display: flex;
            flex-direction: center;
            align-items: center;
            justify-content: center;
        }

        #widget-circle {
            z-index: 9999;
            border-radius: 50%;
            border: 1px solid white;
            width: 40px;
            height: 40px;
            display: flex;
            flex-direction: center;
            align-items: center;
            justify-content: center;
        }

        #widget-circle svg {
            transform: scale(1.3);
        }

        #widget-circle svg path {
            fill: white
        }

        #widget-overflow {
            z-index: 9999;
            display: none;
            position: fixed;
            left: 0;
            top: 6rem;
            width: 100%;
            height: 74vh;
            background-color: transparent;
            display: flex;
            justify-content: flex-end;
            padding-right: 56px;
            padding-top: 62px;
            box-sizing: border-box;
            font-family: "Inter"
        }

        #widget-modal {
            box-shadow: 0px 10px 15px -3px #0000001A;
            width: 300px;
            height: 100%;
            max-height: calc(100vh - 62px - 25px - 73px - 42px);
            border-radius: 10px;
            background-color: white;
            display: flex;
            flex-direction: column;
            transition-duration: .3s;
        }

        #widget-modal-header {
            position: relative;
            width: 100%;
            padding: 24px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between
        }

        .widget-community-logo {
            width: 55px;
            height: 55px;
            object-fit: cover;
            border-radius: 8px
        }

        .widget-users {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-left: 46px;
        }

        .widget-users span {
            font-size: 12px;
            font-weight: 400;
            color: #A4A4A4;
            margin-left: 18%;
        }

        #widget-members {
            display: flex;
            align-items: center;
        }

        .widget-member-photo {
            width: 37px;
            height: 37px;
            border-radius: 6px;
            border: 2px solid white;
            object-fit: cover;
            position: relative;
            background-color: white;
            z-index: 1
        }

        .widget-member-left-photo {
            left: -15px
        }

        #widget-tabs {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-height: calc(100% - 160px);
            height: 100%;
            overflow-y: auto;
            max-width: 100%;
            overflow-x: hidden;
        }

        .widget-tab {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .widget-title-tab {
            padding: 0 24px;
            box-sizing: border-box;
            color: #A4A4A4;
            font-size: 14px;
            font-weight: 400;
        }

        .widget-channels {
            width: 100%;
            display: flex;
            flex-direction: column;
        }

        .widget-channel {
            width: 100%;
            padding: 8px 25px;
            box-sizing: border-box;
            transition-duration: .3s;
            cursor: pointer;
            background-color: white;
            display: flex;
            align-items: center;
            gap: 24px;
        }

        .widget-channel:hover {
            background-color: #FAFAFA
        }

        .widget-emoji {
            background-color: #F6F6F6;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            max-width: 30px;
            max-height: 30px;
        }

        .widget-emoji span {
          font-size: 16px;
        }

        .widget-channel-name {
            color: #404040;
            font-size: 14px;
            font-weight: 400;
        }

        #widget-footer {
            padding: 24px;
            padding-bottom: 32px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: auto;
        }

        #widget-view-full-community-link {
            text-align: center;
            color: #A4A4A4;
            font-szie: 14px;
            font-weight: 400;
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
        }

        #widget-view-full-community-link span {
            font-size: 14px
        }

        #widget-view-full-community-link svg {
            transform: scale(.8)
        }

        #widget-view-full-community-link:hover {
            text-decoration: underline
        }

        #widget-search {
            width: calc(100% - 48px);
            display: flex;
            align-items: center;
            border: 1px solid #00000014;
            border-radius: 8px;
            gap: 10px;
            padding: 16px 16px;
            box-sizing: border-box;
            margin: auto;
            margin-bottom: 28px;
            background-color: #FAFAFA;
            transition-duration: .3s;
        }

        #widget-search-input {
            border: none;
            outline: none;
            font-size: 14px;
            color: #404040;
            background-color: transparent;
            font-weight: 400;
        }

        #widget-search-input::placeholder {
            color: #B6B7B9;
            font-weight: 300;
        }

        .widget-channel-page-title {
            display: flex;
            align-items: center;
            gap: 10px;
            position: relative;
            left: -10px
        }

        .widget-channel-page-title .widget-emoji {
            background: transparent
        }

        #widget-back-button, #widget-back-button-help {
            position: absolute;
            left: 24px;
            background: transparent;
            outline: none;
            cursor: pointer;
            border: none;
            top: 38%;
        }

        .widget-post {
            width: 100%;
            padding: 24px;
            box-sizing: border-box;
            cursor: pointer;
            background-color: transparent;
            transition-duration: .3s;
            display: flex;
            gap: 1rem;
            border-bottom: 1px solid #00000014;
            max-width: 100%;
            overflow-x: hide;
        }

        .widget-post:hover {
            background-color: #00000014
        }

        .widget-post-content {
            max-width: 80%;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .widget-post-content p {
            margin-block-end: 0;
            margin-block-start: 0;
            color: #404040;
            font-weight: 500;
            font-size: 14px;
        }

        .widget-post-content span {
            color: #7F7F7F;
            font-size: 13px;
            line-height: 20px;
            font-weight: 400;
        }

        .widget-empty {
            margin-block-end: 0;
            margin-block-start: 0;
            color: #7F7F7F;
            font-size: 13px;
            line-height: 20px;
            font-weight: 400;
            padding: 24px;
            box-sizing: border-box;
        }

        #widget-still-help-button {
            background-color: transparent;
            border: 1px solid #00000014;
            border-radius: 8px;
            outline: none;
            cursor: pointer;
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            color: #ABADAF;
            font-weight: 400;
            transition-duration: .3s;
        }

        #widget-still-help-button:hover {
            border: 1px solid #504de5;
            color: #504de5;
        }

        #widget-still-help-button svg path {
            transition-duration: .3s
        }

        #widget-still-help-button:hover svg path {
            fill: #504de5;
        }

        #widget-answer-block {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 22px;
            padding: 0 24px;
            box-sizing: border-box;
        }

        #widget-answer-block-input {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 11px 15px;
            box-sizing: border-box;
            background-color: #FAFAFA;
            border: 1px solid #00000014;
            border-radius: 8px;
            transition-duration: .3s;
        }

        #widget-answer-block-input input {
            width: 65%;
            border: none;
            outline: none;
            background-color: transparent;
            font-size: 14px;
            color: #7F7F7F;
            font-weight: 300;
        }

        #widget-answer-block-input input::placeholder {
            color: #B6B7B9;
            font-weight: 300;
        }

        #widget-answer-block-input button {
            background-color: #E7E7FD;
            color: #504DE5;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 400;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            padding: 9px 14px;
            width: fit-content;
        }

        #widget-answer-block-input button svg {
            transition-duration: .5s
        }

        #widget-answer-block-input button:hover svg {
            transform: translateX(3px)
        }

        .widget-answer-message {
            font-size: 13px;
            font-weight: 400;
            line-height: 20px;
            color: #7F7F7F;
        }

        #widget-answer-title {
            font-size: 20px;
            line-height: 30px;
            font-weight: 400;
        }

        #widget-answer-help-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 6px;
        }

        #widget-answer-help-buttons button {
            font-size: 16px;
            font-weight: 400;
            display: flex;
            align-items: center;
            gap: 10px;
            border-radius: 8px;
            padding: 16px 20px;
            border: none;
            cursor: pointer;
            width: 222px;
        }

        #widget-answer-help-button {
            background-color: #E8FFE0;
            color: #49B517;
        }

        #widget-answer-still-help-button {
            background-color: #FFE9E9;
            color: #EA0707;
        }

        #widget-notifications {
            z-index: 9999;
            display: none;
            flex-direction: column;
            position: fixed;
            bottom: 145px;
            right: 56px;
            width: 300px;
            gap: 22px;
            font-family: "Inter";
        }

        #widget-notifications-title {
            font-size: 32px;
        }

        #widget-notifications-list {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 18px;
        }

        .widget-notifications-block , .widget-notifications-block-new {
            width: 100%;
            display: flex;
            flex-direction: column;
            border: 1px solid #E7E7E8;
            border-radius: 10px;
            background-color: white;
            padding: 18px 25px;
            box-sizing: border-box;
            box-shadow: 0px 10px 15px -3px #0000001A;
            transition-duration: .3s;
        }

        .widget-notifications-block-title svg {
            transform: scale(1.4);
        }

        .widget-notifications-block:hover {
            /* border: 1px solid #504de5; */
        }

        .widget-notifications-open:hover {
            border: 1px solid #E7E7E8 !important;
        }

        .widget-notifications-block:hover .widget-notifications-block-title svg {
          /* transform: scale(1.4) rotate(90deg); */
        }

        .widget-notifications-block-title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
        }

        .widget-notifications-block-title span {
            font-size: 14px;
            color: #000000;
            font-weight: 400;
        }

        .widget-notifications-block-text {
            font-size: 13px;
            color: #7F7F7F;
            line-height: 20px;
            font-weight: 400;
            display: block;
            margin-top: 10px;
        }

        .widget-notifications-block svg {
            transition-duration: .3s
        }

        .widget-notifications-block button, .widget-notifications-block-new button {
            font-size: 12px;
            padding: 9px 14px;
            color: #504DE5;
            font-weight: 500;
            border-radius: 5px;
            background-color: #E7E7FD;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            border: none;
            outline: none;
            width: fit-content;
            margin-top: 22px;
        }

        .widget-notifications-block button svg {
            transition-duration: .5s
        }

        .widget-notifications-block button:hover svg {
            transform: translateX(3px)
        }

        @media screen and (max-width: 468px) {
            .widget-main-button, #widget-notifications {
                display: none !important;
            }
        }

        #widget-modal-header {
          display: flex;
          justify-content: space-between;
          background: transparent;
          border-bottom: none;
      }

      .widget-community-logo {
          /* Add any specific styling for the logo if needed */
      }

      .widget-users {
          display: flex;
          align-items: center;
      }

      #widget-members {
          display: flex;
      }

      .widget-member-photo {
          margin-left: 5px; /* Adjust the margin as needed */
      }

      .widget-member-left-photo {
          transform: scaleX(-1); /* Flip the images for a mirrored effect on the left */
      }
      .loader {
        border: 1px solid #f3f3f3;
        border-top: 1px solid #504DE5;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
        background: #FFF;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      #search-input::placeholder{
        color: #ABADAF;
      }
      .search-input-div:hover{
        border: 1px solid #504DE5 !important;
      }
      .search-input-div-input:focus{
        border: 1px solid #504DE5 !important;
      }
      .search-input-div-input:focus-within{
        border: 1px solid #504DE5 !important;
      }
      .hover-suggestion-fill:hover{
        border: 1px solid #504DE5 !important;
      }

      .hover-ask-community-fill:hover{
        background: #FAFAFA !important;
      }

    `;

  let head = document.head || document.getElementsByTagName("head")[0];
  let style = document.createElement("style");

  let link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap";
  link.rel = "stylesheet";

  head.appendChild(link);

  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);

  let scriptTag =
    document.currentScript ||
    (function () {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1];
    })();

  // const notificationsMessages = [
  //   {
  //     title: "Connect your LinkedIn account",
  //     text: "You can connect your LinkedIn account by clicking â€œAccountâ€, then looking for the â€œLinkedInâ€ section, and clicking â€œConnectâ€.",
  //   },
  //   {
  //     title: "Connect your company account",
  //     text: "You can connect your LinkedIn account by clicking â€œAccountâ€, then looking for the â€œLinkedInâ€ section, and clicking â€œConnectâ€.",
  //   },
  //   {
  //     title: "Connect a different profile",
  //     text: "You can connect your LinkedIn account by clicking â€œAccountâ€, then looking for the â€œLinkedInâ€ section, and clicking â€œConnectâ€.",
  //   },
  //   {
  //     title: "Auto-like posts with other profile",
  //     text: "You can connect your LinkedIn account by clicking â€œAccountâ€, then looking for the â€œLinkedInâ€ section, and clicking â€œConnectâ€.",
  //   },
  // ];

 
  // const webSocket = new WebSocket('ws://20.117.113.206:8000/log/ws_create');

  let notificationOpenId = 0;

  const helloEmoji = "1f44b";
  const apiKey = scriptTag.getAttribute("data-api-key");
  const tabs = scriptTag.getAttribute("data-tabs").split(", ");
  const selectedChannels = scriptTag.getAttribute("data-channels").split(", ");
  const communityId = scriptTag.getAttribute("data-community-id");
  const publicBaseImgUrl = scriptTag.getAttribute("data-public-base-img-url");
  const isNotification = new BooleanWatcher(false, handleBooleanChange);

  const apiURL = "https://prod-api.bubbles.community/";
  const hostURL = "communityforum.app";

  let tabsData = null;
  let channels = [];
  let community = null;

  // Check if the API key is provided
  if (!apiKey) {
    console.error("API key not provided in the script tag attributes");
    return;
  }

  let notificationsMessages = [];
  const baseUrl = "https://supportai.ngrok.io";
  let sessionID = "";
  let completedStep = "";
  let apiResponse = [];
  const analyticsUrl = `${baseUrl}/analytics/create/`;
  const sessionSupportUrl = `${baseUrl}/log/session_support_details/`;


  function redirectToCommunity(community_title, cId) {
    const viewFullCommunityLink = `https://${urlFormater(
      community_title
    )}.${hostURL}/community/${urlFormater(
      community_title
    )}?&community_id=${cId}`;
    return viewFullCommunityLink;
  }

  function redirectToPost(community_title, cId, chId, postName, postId) {
    const viewChannelCommunityLink = `https://${urlFormater(
      community_title
    )}.${hostURL}/community/${urlFormater(community_title)}/post/${urlFormater(
      postName
    )}/?postId=${postId}&community_id=${cId}`;
    window.open(viewChannelCommunityLink, "_blank");
  }

  function handleBooleanChange(newValue) {
    let mainLayout = document.getElementById("widget-overflow");
    let notifications = document.getElementById("widget-notifications");

    let widgetCircle = document.getElementById("widget-circle");

    console.log("Handling Boolean change", apiResponse);

    apiResponse.forEach((el, index) => {
      let ntf = document.getElementById(`widget-notifications-block-${index}`);
      console.log(ntf);
      ntf.onclick = function () {
          // const ntfIndex = new NumberWatcher(-1, handleIndexNotificationChange);
          const ntfIndex = new NumberWatcher(-1, handleNotiArrowClick);
          ntfIndex.setValue(index);
        };
      
      
    });

    if (newValue) {
      widgetCircle.innerHTML = newValue
        ? `
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7725 1.32466C11.8446 1.25269 11.9018 1.16724 11.9408 1.07318C11.9798 0.979113 11.9999 0.878283 12 0.776444C12.0001 0.674605 11.9801 0.573751 11.9412 0.47964C11.9022 0.38553 11.8452 0.300005 11.7732 0.22795C11.7012 0.155894 11.6158 0.0987197 11.5217 0.0596898C11.4277 0.0206599 11.3268 0.00053926 11.225 0.000476667C11.1232 0.000414074 11.0223 0.0204108 10.9282 0.059325C10.8341 0.0982392 10.7486 0.155309 10.6765 0.227275L5.9999 4.90396L1.32464 0.227275C1.17912 0.0817534 0.981751 -1.53333e-09 0.775955 0C0.570159 1.53332e-09 0.372791 0.0817534 0.227272 0.227275C0.081752 0.372798 1.5333e-09 0.570168 0 0.775967C-1.5333e-09 0.981767 0.081752 1.17914 0.227272 1.32466L4.90388 6L0.227272 10.6753C0.155218 10.7474 0.0980613 10.8329 0.0590659 10.9271C0.0200705 11.0212 0 11.1221 0 11.224C0 11.3259 0.0200705 11.4268 0.0590659 11.521C0.0980613 11.6151 0.155218 11.7007 0.227272 11.7727C0.372791 11.9182 0.570159 12 0.775955 12C0.877855 12 0.978757 11.9799 1.0729 11.9409C1.16704 11.9019 1.25258 11.8448 1.32464 11.7727L5.9999 7.09603L10.6765 11.7727C10.822 11.9181 11.0193 11.9996 11.225 11.9995C11.4307 11.9994 11.6279 11.9176 11.7732 11.772C11.9185 11.6265 12.0001 11.4292 12 11.2236C11.9999 11.0179 11.918 10.8207 11.7725 10.6753L7.09592 6L11.7725 1.32466Z" fill="black"/>
                </svg>
            `
        : "?";

      mainLayout.style.display = "none";
      notifications.style.display = "flex";
    } else {
      notifications.style.display = "none";
      mainLayout.style.display = "none";
    }
  }

  function handleIndexNotificationChange(newValue) {
    const header = document.getElementById("widget-modal-header");

    notificationOpenId = notificationOpenId === newValue ? -1 : newValue;

    notificationsMessages.forEach((el, index) => {
      let ntf = document.getElementById(`widget-notifications-block-${index}`);
      if (notificationOpenId === index) {
        if (newValue === index) {
          ntf.classList.add("widget-notifications-open");
          ntf.innerHTML = `
                        <div class="widget-notifications-block-title" id="widget-notifications-block-title-${index}">
                            <span>${el.title}</span>
                            <svg style="transform: scale(1.4) rotate(90deg)" id="widget-notifications-block-title-arrow-${index}" width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0.94L2.5003 4L0 7.06L0.769744 8L4.04525 4L0.769744 0L0 0.94Z" fill="#504DE5"/>
                            </svg>
                        </div>
                        <span class="widget-notifications-block-text">${el.text}</span>
                        <button id="widget-notifications-help-button-${index}">
                            <span>I need more help</span>
                            <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0.94L2.5003 4L0 7.06L0.769744 8L4.04525 4L0.769744 0L0 0.94Z" fill="#504DE5"/>
                            </svg>
                        </button>
                    `;

          let ntfButton = document.getElementById(
            `widget-notifications-help-button-${index}`
          );

          const isNotification = new BooleanWatcher(true, handleBooleanChange);

          ntfButton.onclick = function () {
            console.log("ntf click");

            isNotification.setValue(false);

            const modal = document.getElementById("widget-modal");
            modal.style.width = "632px";

            header.style.background = "#FAFAFA";
            header.style.borderBottom = "1px solid #00000014";
            header.style.justifyContent = "center";

            header.innerHTML = `
                            <button id="widget-back-button">
                                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.26245 13.2375L3.53745 7.5L9.26245 1.7625L7.49995 0L-4.86374e-05 7.5L7.49995 15L9.26245 13.2375Z" fill="#404040"/>
                                </svg>
                            </button>
                            <div class="widget-channel-page-title">
                                <div class="widget-emoji">
                                    <span>${String.fromCodePoint(
                                      parseInt(helloEmoji, 16)
                                    )}</span>
                                </div>
                                <span class="widget-channel-name">This might help...</span>
                            </div>
                        `;
            const widgetFooter = document.getElementById("widget-footer");
            widgetFooter.style.justifyContent = "center";

            let searchBlock = document.getElementById("widget-search");
            searchBlock.style.display = "none";

            const tabsBlock = document.getElementById("widget-tabs");
            tabsBlock.innerHTML = `
                            <div id="widget-answer-block">
                                <span id="widget-answer-title">How to connect your companyâ€™s LinkedIn account to you triggify account.</span>
                                <span class="widget-answer-message">
                                    As a Lavender user, this community will be the starting point of every interaction or communication that you have with the brand. You go to the community to get support. As a Lavender user, this community will be the starting point of every interaction or communication that you have with the brand. You go to the community to get support. As a Lavender user, this community will be the starting point of every interaction or communication that you have with the brand. You go to the community to get support.
                                </span>
                                <div id="widget-answer-help-buttons">
                                    <button id="widget-answer-help-button">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 13.0506 4.20693 14.0909 4.60896 15.0615C5.011 16.0321 5.60028 16.914 6.34315 17.6569C7.08601 18.3997 7.96793 18.989 8.93853 19.391C9.90914 19.7931 10.9494 20 12 20C13.0506 20 14.0909 19.7931 15.0615 19.391C16.0321 18.989 16.914 18.3997 17.6569 17.6569C18.3997 16.914 18.989 16.0321 19.391 15.0615C19.7931 14.0909 20 13.0506 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893ZM8 10C8 9.44772 8.44772 9 9 9H9.01C9.56228 9 10.01 9.44772 10.01 10C10.01 10.5523 9.56228 11 9.01 11H9C8.44772 11 8 10.5523 8 10ZM14 10C14 9.44772 14.4477 9 15 9H15.01C15.5623 9 16.01 9.44772 16.01 10C16.01 10.5523 15.5623 11 15.01 11H15C14.4477 11 14 10.5523 14 10ZM8.46479 14.121C8.85525 13.7304 9.48842 13.7303 9.879 14.1208C10.4416 14.6832 11.2045 14.9991 12 14.9991C12.7955 14.9991 13.5584 14.6832 14.121 14.1208C14.5116 13.7303 15.1447 13.7304 15.5352 14.121C15.9257 14.5116 15.9256 15.1447 15.535 15.5352C14.5974 16.4726 13.3258 16.9991 12 16.9991C10.6742 16.9991 9.40264 16.4726 8.465 15.5352C8.07442 15.1447 8.07432 14.5116 8.46479 14.121Z" fill="#49B517"/>
                                        </svg>
                                        <span>This has helped me</span>
                                    </button>
                                    <!-- <button id="widget-answer-still-help-button">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 13.0506 4.20693 14.0909 4.60896 15.0615C5.011 16.0321 5.60028 16.914 6.34315 17.6569C7.08601 18.3997 7.96793 18.989 8.93853 19.391C9.90914 19.7931 10.9494 20 12 20C13.0506 20 14.0909 19.7931 15.0615 19.391C16.0321 18.989 16.914 18.3997 17.6569 17.6569C18.3997 16.914 18.989 16.0321 19.391 15.0615C19.7931 14.0909 20 13.0506 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893ZM8 10C8 9.44772 8.44772 9 9 9H9.01C9.56228 9 10.01 9.44772 10.01 10C10.01 10.5523 9.56228 11 9.01 11H9C8.44772 11 8 10.5523 8 10ZM14 10C14 9.44772 14.4477 9 15 9H15.01C15.5623 9 16.01 9.44772 16.01 10C16.01 10.5523 15.5623 11 15.01 11H15C14.4477 11 14 10.5523 14 10ZM12 16.0009C11.2045 16.0009 10.4416 16.3168 9.879 16.8792C9.48842 17.2697 8.85525 17.2696 8.46479 16.879C8.07432 16.4884 8.07442 15.8553 8.465 15.4648C9.40264 14.5274 10.6742 14.0009 12 14.0009C13.3258 14.0009 14.5974 14.5274 15.535 15.4648C15.9256 15.8553 15.9257 16.4884 15.5352 16.879C15.1447 17.2696 14.5116 17.2697 14.121 16.8792C13.5584 16.3168 12.7955 16.0009 12 16.0009Z" fill="#EA0707"/>
                                        </svg>
                                        <span>I still need help...</span>
                                    </button>
                                    -->
                                </div>
                            </div>
                        `;
            modal.style.height = "fit-content";
            modal.style.marginTop = "auto";
            modal.style.marginBottom = "130px";

            let stillNeedHelpButton = document.getElementById(
              "widget-answer-still-help-button"
            );
            stillNeedHelpButton.onclick = function () {
              modal.style.height = "fit-content";
              modal.style.marginTop = "auto";
              modal.style.marginBottom = "130px";

              header.innerHTML = `
                                <button id="widget-back-button-help">
                                    <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.26245 13.2375L3.53745 7.5L9.26245 1.7625L7.49995 0L-4.86374e-05 7.5L7.49995 15L9.26245 13.2375Z" fill="#404040"/>
                                    </svg>
                                </button>
                                <div class="widget-channel-page-title">
                                    <div class="widget-emoji">
                                        <span>${String.fromCodePoint(
                                          parseInt(helloEmoji, 16)
                                        )}</span>
                                    </div>
                                    <span class="widget-channel-name">What are you trying to achieve?</span>
                                </div>
                            `;

              tabsBlock.innerHTML = `
                                <div id="widget-answer-block">
                                    <div id="widget-answer-block-input">
                                        <input id="widget-answer-input" placeholder="Enter your question..."/>
                                        <button>
                                            Get an answer
                                            <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.344727 0.94L2.60376 4L0.344727 7.06L1.04019 8L3.99963 4L1.04019 0L0.344727 0.94Z" fill="#504DE5"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <span class="widget-answer-message">
                                        As a Lavender user, this community will be the starting point of every interaction or communication that you have with the brand. You go to the community to get support. As a Lavender user, this community will be the starting point of every interaction or communication that you have with the brand. You go to the community to get support. As a Lavender user, this community will be the starting point of every interaction or communication that you have with the brand. You go to the community to get support.
                                    </span>
                                </div>
                            `;

              const widgetInputBlock = document.getElementById(
                "widget-answer-block-input"
              );

              document
                .getElementById("widget-answer-input")
                .addEventListener("focus", function () {
                  widgetInputBlock.style.border = "1px solid #504de5";
                  widgetInputBlock.style.boxShadow = "0 0 10px -3px #504de5";
                });

              document
                .getElementById("widget-answer-input")
                .addEventListener("blur", function () {
                  widgetInputBlock.style.border = "1px solid #00000014";
                  widgetInputBlock.style.boxShadow = "none";
                });

              const stillNeedHelpButtonBack = document.getElementById(
                "widget-back-button-help"
              );
              stillNeedHelpButtonBack.onclick = function () {
                widgetFooter.style.justifyContent = "center";
                seedTabsAndChannels(tabsData);
                seedHeaderWithCommunityInfo(community, header);
                modal.style.width = "300px";
                modal.style.height = "100%";
                modal.style.marginTop = "0";
                modal.style.marginBottom = "0";

                header.style.background = "transparent";
                header.style.borderBottom = "none";
                header.style.justifyContent = "space-between";

                searchBlock.style.display = "flex";
              };
            };
            let helpedButton = document.getElementById(
              "widget-answer-help-button"
            );
            helpedButton.onclick = function () {
              seedHeaderWithCommunityInfo(community, header);
              seedTabsAndChannels(tabsData);
              widgetFooter.style.justifyContent = "center";
              modal.style.width = "300px";
              modal.style.height = "100%";
              modal.style.marginTop = "0";
              modal.style.marginBottom = "0";

              header.style.background = "transparent";
              header.style.borderBottom = "none";
              header.style.justifyContent = "space-between";

              searchBlock.style.display = "flex";
            };

            const backButton = document.getElementById("widget-back-button");

            backButton.onclick = function () {
              seedHeaderWithCommunityInfo(community, header);
              seedTabsAndChannels(tabsData);
              widgetFooter.style.justifyContent = "center";
              modal.style.width = "300px";
              modal.style.height = "100%";
              modal.style.marginTop = "0";
              modal.style.marginBottom = "0";

              header.style.background = "transparent";
              header.style.borderBottom = "none";
              header.style.justifyContent = "space-between";

              searchBlock.style.display = "flex";
            };
          };
        } else {
          ntf.innerHTML = `
                        <div class="widget-notifications-block-title" id="widget-notifications-block-title-${index}">
                            <span>${el.title}</span>
                            <svg id="widget-notifications-block-title-arrow-${index}" width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0.94L2.5003 4L0 7.06L0.769744 8L4.04525 4L0.769744 0L0 0.94Z" fill="#504DE5"/>
                            </svg>
                        </div>
                    `;
        }
      } else {
        ntf.classList.remove("widget-notifications-open");
        ntf.innerHTML = `
                    <div class="widget-notifications-block-title" id="widget-notifications-block-title-${index}">
                        <span>${el.title}</span>
                        <svg id="widget-notifications-block-title-arrow-${index}" width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0.94L2.5003 4L0 7.06L0.769744 8L4.04525 4L0.769744 0L0 0.94Z" fill="#504DE5"/>
                        </svg>
                    </div>
                `;
      }
    });
  }

  async function openFinalScreen(searchInput) {
    let response = await fetch(
      `${baseUrl}/log/support/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          support_query: searchInput,
        }),
      }
    );

    let data = await response.json();
    let insideNoti = document.getElementById("widget-notifications-list");
    document.getElementById("widget-notifications-title").style.display =
      "none";
    document.getElementById("widget-notifications").style.right = "205px";
    const notificationsMessages = data?.data[0]?.support_detailed_answer;
    let htmlContent = `

            ${notificationsMessages
              .map(
                (el, index) =>
                  `
                <div style="width: 450px;" class="widget-notifications-block-new" id="widget-notifications-block-${index}">
                <div style="justify-content: left" class="widget-notifications-block-title" id="widget-notifications-block-new-title-${index}">
                <span style="width: 32px; height: 32px; justify-content: center; border-radius: 50%; background: #F1F1F2; color: #000000;
                font-size: 14px; font-weight: 500; display: flex; align-items: center; line-height: 1;">${
                  index + 1
                }</span>
                <span style="padding-left: 25px; width: 90%;">${el}</span>
                </div>
            </div>
                `
              )
              .join("")}
`;
    //include button in bottom
    htmlContent += `
    <div style="width: 450px;" class="widget-notifications-block-new" id="widget-notifications-new-block-ask-community">
    <div style="display: flex; justify-content: center;" class="widget-notifications-block-title" id="widget-notifications-block-new-title-ask-community">
      <button style="margin-top: 0px;display: flex; align-items: center; justify-content: center;
       border-radius: 6px; border: 1px solid #F1F1F2; background: white;
      " class='hover-ask-community-fill'>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7.58332 1.75L9.50423 3.67092L5.4209 7.75425L6.24573 8.57908L10.3291 4.49575L12.25 6.41667V1.75H7.58332Z" fill="#7F7F7F"/>
      <path d="M11.0833 11.0833H2.91667V2.91667H7L5.83333 1.75H2.91667C2.27325 1.75 1.75 2.27325 1.75 2.91667V11.0833C1.75 11.7267 2.27325 12.25 2.91667 12.25H11.0833C11.7267 12.25 12.25 11.7267 12.25 11.0833V8.16667L11.0833 7V11.0833Z" fill="#7F7F7F"/>
    </svg>
        <span style="margin-left: 5px; font-size: 14px; font-weight: 400; color: #7F7F7F">Ask the community</span>
      </button>
    </div>
  </div>
        `;
    //end
    insideNoti.innerHTML = htmlContent;
    notificationsMessages.map((item, index) => {
      let listener = document.getElementById(
        `widget-notifications-block-${index}`
      );
    });
  }
  //handles when a initial button is clicked
  function handleNotiArrowClick(index) {
    console.log(index, apiResponse);

    let data = apiResponse?.find((item, i) => i == index);
    console.log("data", data);
    let insideNoti = document.getElementById("widget-notifications-list");
    document.getElementById("widget-notifications-title").style.display =
      "none";
    document.getElementById("widget-notifications").style.right = "205px";
    const notificationsMessages = data.support_detailed_steps;
    const nextComponents = data.next_components;
    // Count the number of elements in notificationsMessages
    const numberOfMessages = notificationsMessages.length;

    // Create an array with the same number of elements as notificationsMessages, but all set to 0
    const sessionSupportConfidence = Array(numberOfMessages).fill(0);

    fetch(sessionSupportUrl, {
      method: 'POST', // Specify the method
      headers: {
        'Content-Type': 'application/json', // Set the content type header
        'accept': 'application/json', // Set the accept header
        'x-api-key': apiKey
      },
      body: JSON.stringify(
        {
          "session_id": sessionID,
          "session_support_details": notificationsMessages,
          "session_support_components": nextComponents,
          "session_support_confidence": sessionSupportConfidence

        }
        
      ) // Convert the JavaScript object to a JSON string
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    let htmlContent = `

            ${notificationsMessages
              .map(
                (el, index) =>
                  `
                <div style="width: 450px;" class="widget-notifications-block-new" id="widget-notifications-${index}">
                <div style="justify-content: left" class="widget-notifications-block-title" id="widget-notifications-block-title-${index}">
                <span style="width: 32px; height: 32px; justify-content: center; border-radius: 50%; background: #F1F1F2; color: #000000;
                font-size: 14px; font-weight: 500; display: flex; align-items: center; line-height: 1;">${
                  index + 1
                }</span>
                <span style="padding-left: 25px; width: 90%;">${el}</span>
                </div>
            </div>
                `
              )
              .join("")}
`;
    //include button in bottom
    htmlContent += `
    <div style="width: 450px;" class="widget-notifications-block-new" id="widget-notifications-new-block-ask-community">
    <div  style="display: flex; justify-content: center;" class="widget-notifications-block-title" id="widget-notifications-block-new-title-ask-community">
      <button style="margin-top: 0px;display: flex; align-items: center; justify-content: center;
       border-radius: 6px; border: 1px solid #F1F1F2; background: white;
      "
      class='hover-ask-community-fill'
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7.58332 1.75L9.50423 3.67092L5.4209 7.75425L6.24573 8.57908L10.3291 4.49575L12.25 6.41667V1.75H7.58332Z" fill="#7F7F7F"/>
      <path d="M11.0833 11.0833H2.91667V2.91667H7L5.83333 1.75H2.91667C2.27325 1.75 1.75 2.27325 1.75 2.91667V11.0833C1.75 11.7267 2.27325 12.25 2.91667 12.25H11.0833C11.7267 12.25 12.25 11.7267 12.25 11.0833V8.16667L11.0833 7V11.0833Z" fill="#7F7F7F"/>
    </svg>
        <span style="margin-left: 5px; font-size: 14px; font-weight: 400; color: #7F7F7F">Ask the community</span>
      </button>
    </div>
  </div>
        `;
    //end
    insideNoti.innerHTML = htmlContent;
  }

  function handleInputChange(event) {
    let searchValue = event.target.value;

    const tabsBlock = document.getElementById("widget-tabs");
    const widgetFooter = document.getElementById("widget-footer");

    const modal = document.getElementById("widget-modal");

    if (searchValue.length > 2) {
      fetch(
        `${
          apiURL +
          `community/v1/global-search?searchKey=${searchValue}&communityId=${communityId}&searchType=posts`
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          const posts = data.data;

          const widgetTabs = tabsBlock.querySelectorAll(".widget-tab");

          widgetTabs.forEach((el) => {
            el.style.display = "none";
          });

          modal.style.width = "450px";

          if (posts.length > 0) {
            tabsBlock.style.gap = 0;
            tabsBlock.innerHTML = `
                            ${posts
                              .map(
                                (post) => `
                                <div id="widget-post-${post.post_id}">
                                    ${drawPost(post)}
                                </div>
                            `
                              )
                              .join("")}
                        `;
          } else {
            tabsBlock.innerHTML = `
                            <p class="widget-empty">No results found for this search.</p>
                        `;
          }

          // widgetFooter.innerHTML = `
          //               <button id="widget-still-help-button">
          //                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          //                       <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 13.0506 4.20693 14.0909 4.60896 15.0615C5.011 16.0321 5.60028 16.914 6.34315 17.6569C7.08601 18.3997 7.96793 18.989 8.93853 19.391C9.90914 19.7931 10.9494 20 12 20C13.0506 20 14.0909 19.7931 15.0615 19.391C16.0321 18.989 16.914 18.3997 17.6569 17.6569C18.3997 16.914 18.989 16.0321 19.391 15.0615C19.7931 14.0909 20 13.0506 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893ZM8 10C8 9.44772 8.44772 9 9 9H9.01C9.56228 9 10.01 9.44772 10.01 10C10.01 10.5523 9.56228 11 9.01 11H9C8.44772 11 8 10.5523 8 10ZM14 10C14 9.44772 14.4477 9 15 9H15.01C15.5623 9 16.01 9.44772 16.01 10C16.01 10.5523 15.5623 11 15.01 11H15C14.4477 11 14 10.5523 14 10ZM12 16.0009C11.2045 16.0009 10.4416 16.3168 9.879 16.8792C9.48842 17.2697 8.85525 17.2696 8.46479 16.879C8.07432 16.4884 8.07442 15.8553 8.465 15.4648C9.40264 14.5274 10.6742 14.0009 12 14.0009C13.3258 14.0009 14.5974 14.5274 15.535 15.4648C15.9256 15.8553 15.9257 16.4884 15.5352 16.879C15.1447 17.2696 14.5116 17.2697 14.121 16.8792C13.5584 16.3168 12.7955 16.0009 12 16.0009Z" fill="#B6B7B9"/>
          //                   </svg>
          //                    <span>I still need help...</span>
          //               </button>
          //           `;

          let stillNeedHelpButton = document.getElementById(
            "widget-still-help-button"
          );
          stillNeedHelpButton.onclick = function () {
            modal.style.width = "632px";
            modal.style.height = "fit-content";
            modal.style.marginTop = "auto";
            modal.style.marginBottom = "130px";

            const header = document.getElementById("widget-modal-header");
            header.innerHTML = `
                            <button id="widget-back-button-help">
                                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.26245 13.2375L3.53745 7.5L9.26245 1.7625L7.49995 0L-4.86374e-05 7.5L7.49995 15L9.26245 13.2375Z" fill="#404040"/>
                                </svg>
                            </button>
                            <div class="widget-channel-page-title">
                                <div class="widget-emoji">
                                    <span>${String.fromCodePoint(
                                      parseInt(helloEmoji, 16)
                                    )}</span>
                                </div>
                                <span class="widget-channel-name">What are you trying to achieve?</span>
                            </div>
                        `;

            header.style.background = "#FAFAFA";
            header.style.borderBottom = "1px solid #00000014";
            header.style.justifyContent = "center";

            widgetFooter.innerHTML = `
                            <a target="_blank" href="${redirectToCommunity(
                              community.community_title,
                              community.community_id
                            )}" id="widget-view-full-community-link">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                <span>View full community</span>
                            </a>
                        `;

            widgetFooter.style.justifyContent = "center";

            let searchBlock = document.getElementById("widget-search");
            searchBlock.style.display = "none";

            const tabsBlock = document.getElementById("widget-tabs");
            tabsBlock.innerHTML = `
                            <div id="widget-answer-block">
                                <div id="widget-answer-block-input">
                                    <input placeholder="Enter your question..."/>
                                    <button>
                                        Get an answer
                                        <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.344727 0.94L2.60376 4L0.344727 7.06L1.04019 8L3.99963 4L1.04019 0L0.344727 0.94Z" fill="#504DE5"/>
                                        </svg>
                                    </button>
                                </div>
                                <span class="widget-answer-message">
                                    As a Lavender user, this community will be the starting point of every interaction or communication that you have with the brand. You go to the community to get support. As a Lavender user, this community will be the starting point of every interaction or communication that you have with the brand. You go to the community to get support. As a Lavender user, this community will be the starting point of every interaction or communication that you have with the brand. You go to the community to get support.
                                </span>
                            </div>
                        `;

            const stillNeedHelpButtonBack = document.getElementById(
              "widget-back-button-help"
            );
            stillNeedHelpButtonBack.onclick = function () {
              widgetFooter.style.justifyContent = "center";
              seedTabsAndChannels(tabsData);
              seedHeaderWithCommunityInfo(community, header);
              modal.style.width = "300px";
              modal.style.height = "100%";
              modal.style.marginTop = "0";
              modal.style.marginBottom = "0";

              header.style.background = "transparent";
              header.style.borderBottom = "none";
              header.style.justifyContent = "space-between";

              searchBlock.style.display = "flex";
            };
          };
        });
    } else if (searchValue.length == 0) {
      tabsBlock.style.gap = "24px";
      modal.style.width = "300px";
      seedTabsAndChannels(tabsData);
      widgetFooter.innerHTML = `
                <a target="_blank" href="${redirectToCommunity(
                  community.community_title,
                  community.community_id
                )}" id="widget-view-full-community-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span>View full community</span>
                </a>
            `;
    }
  }

  function getContent(json) {
    let data = JSON.parse(json);
    let content = "";
    data.blocks.forEach((block) => {
      switch (block.type) {
        case "paragraph":
          content += block.data.text + " ";
          break;
        case "header":
          content += block.data.text + " ";
          break;

        // Handle other block types and inline styles
        default:
        // Handle unknown block types
      }
    });

    content = content.substring(0, 50);

    return content;
  }

  function drawPost(post) {
    setTimeout(() => {
      let postBlock = document.getElementById(`widget-post-${post.post_id}`);
      postBlock.onclick = function () {
        redirectToPost(
          community.community_title,
          community.community_id,
          post.channel_id,
          post.post_title,
          post.post_id
        );
      };
    }, 100);
    return `
            <div class="widget-post">
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_77_1895)">
                        <path d="M14.1442 5.10572H18.2879C18.4243 5.10597 18.5593 5.13458 18.6852 5.18991C18.8111 5.24524 18.9254 5.32621 19.0216 5.42819C19.1179 5.53017 19.1941 5.65116 19.246 5.78425C19.2979 5.91734 19.3244 6.05991 19.3241 6.20382V18.2781L15.8717 15.2381C15.6858 15.0745 15.4514 14.9849 15.2093 14.9848H6.89209C6.75571 14.9845 6.62071 14.9559 6.49481 14.9006C6.36891 14.8452 6.25458 14.7643 6.15835 14.6623C6.06213 14.5603 5.98589 14.4393 5.934 14.3062C5.88211 14.1732 5.85558 14.0306 5.85594 13.8867V10.5943M14.1442 5.10572L14.1433 1.81239C14.1437 1.66856 14.1172 1.52607 14.0653 1.39304C14.0135 1.26002 13.9374 1.13907 13.8412 1.0371C13.7451 0.935134 13.6309 0.854144 13.5051 0.798757C13.3793 0.743369 13.2444 0.714669 13.1081 0.714294H1.71315C1.57677 0.714544 1.44177 0.743152 1.31587 0.798484C1.18998 0.853815 1.07565 0.934785 0.979418 1.03677C0.883191 1.13875 0.806954 1.25974 0.755064 1.39282C0.703174 1.52591 0.67665 1.66848 0.677005 1.81239V13.8876L4.12933 10.8476C4.31529 10.684 4.5497 10.5944 4.79181 10.5943H5.85684M14.1442 5.10572V9.49715C14.1446 9.64106 14.1181 9.78363 14.0662 9.91672C14.0143 10.0498 13.938 10.1708 13.8418 10.2728C13.7456 10.3748 13.6313 10.4557 13.5054 10.5111C13.3795 10.5664 13.2445 10.595 13.1081 10.5952H5.85684" stroke="#B4B4B4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_77_1895">
                            <rect width="20" height="18.9924" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <div class="widget-post-content">
                    <p>${
                      post.is_new == 1
                        ? getContent(post.post_title)
                        : post.post_title
                    }</p>
                    <span>${
                      post?.is_new == 1
                        ? getContent(post.post_description)
                        : removeHtmlAndLimitSentences(post.post_description)
                    }</span>
                </div>
            </div>
        `;
  }

  function drawNotification(notification, index, isOpen) {
    return `
            <div class="widget-notifications-block" id="widget-notifications-block-${index}">
                <div class="widget-notifications-block-title" id="widget-notifications-block-title-${index}">
                    <span>${notification?.initial_support_question}</span>
                    <svg id="widget-notifications-block-title-arrow-${index}" width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0.94L2.5003 4L0 7.06L0.769744 8L4.04525 4L0.769744 0L0 0.94Z" fill="#504DE5"/>
                    </svg>
                </div>
            </div>
        `;
  }

  function seedHeaderWithCommunityInfo(community, header) {
    header.innerHTML = `
            <img src="${
              publicBaseImgUrl + community.community_image
            }" alt="logo" class="widget-community-logo"/>
            <div class="widget-users">
                <span>${community.total_members} member${
      community.total_members > 1 ? "s" : ""
    }</span>
                ${
                  community.total_members > 0
                    ? `
                    <div id="widget-members"></div>
                `
                    : ""
                }
            </div>
        `;

    if (community.total_members > 0) {
      fetch(
        `${apiURL + `community/v1/top-contributers?communityId=${communityId}`}`
      )
        .then((response) => response.json())
        .then((data) => {
          const members = data.data;
          const membersContainer = document.getElementById("widget-members");
          if (members && members.length > 0) {
            membersContainer.innerHTML = `
                            ${members
                              .slice(0, 4)
                              .map(
                                (member, index) => `
                                <img
                                    src="${
                                      publicBaseImgUrl + member.profile_pic
                                    }"
                                    alt="profile pic"
                                    class="widget-member-photo ${
                                      index > 0 && "widget-member-left-photo"
                                    }"
                                    style="z-index: ${
                                      members.length - index
                                    }; ${
                                  index > 1
                                    ? index == 2
                                      ? "left: -25px"
                                      : index == 3
                                      ? "left: -35px"
                                      : ""
                                    : ""
                                }"
                                />
                            `
                              )
                              .join("")}
                        `;
          }
        });
    }
  }

  function seedTabsAndChannels(data) {
    const filteredTabs = [];
    data.data.forEach((el) => {
      el.channels.forEach((ch) => {
        channels.push(ch);
      });
    });

    tabs.forEach((tab_name) => {
      const tab = data.data.find((el) => el.tab_name === tab_name);
      filteredTabs.push(tab);
    });

    const tabsBlock = document.getElementById("widget-tabs");

    tabsBlock.innerHTML = `
            ${filteredTabs
              .map(
                (el) => `
                <div class="widget-tab">
                    <span class="widget-title-tab">${el.tab_name}</span>
                    <div class="widget-channels">
                        ${el.channels
                          .map((ch) => {
                            if (
                              selectedChannels.find(
                                (sCh) => sCh === ch.channel_name
                              )
                            ) {
                              return `
                                    <div class="widget-channel" data-channel-id="${ch.id}">
                                        <div class="widget-emoji">
                                           <img height='16' width='16' src='https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${ch.emoji}.png'/>
                                        </div>
                                        <span class="widget-channel-name">${ch.channel_name}</span>
                                    </div>
                                `;
                            } else {
                              return "";
                            }
                          })
                          .join("")}
                    </div>
                </div>
            `
              )
              .join("")}
        `;

    tabsBlock.addEventListener("click", handleChannelClick);
  }

  function handleChannelClick(event) {
    const channelDiv = event.target.closest(".widget-channel");
    const modal = document.getElementById("widget-modal");

    if (channelDiv) {
      const channelId = channelDiv.getAttribute("data-channel-id");

      fetch(
        `${
          apiURL +
          `community/v1/community-posts?communityId=${communityId}&pageSize=100000&pageNo=1&channelId=${channelId}&filter=new`
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          const posts = data.data.posts;

          const channel = channels.find((ch) => ch.id == channelId);

          const header = document.getElementById("widget-modal-header");
          header.innerHTML = `
                    <button id="widget-back-button">
                        <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.26245 13.2375L3.53745 7.5L9.26245 1.7625L7.49995 0L-4.86374e-05 7.5L7.49995 15L9.26245 13.2375Z" fill="#404040"/>
                        </svg>
                    </button>
                    <div class="widget-channel-page-title">
                        <div class="widget-emoji">
                        <img height='16' width='16' src='https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${channel.emoji}.png'/>
                        </div>
                        <span class="widget-channel-name">${channel.channel_name}</span>
                    </div>
                `;

          header.style.background = "#FAFAFA";
          header.style.borderBottom = "1px solid #00000014";
          header.style.justifyContent = "center";

          modal.style.width = "450px";

          let searchBlock = document.getElementById("widget-search");
          searchBlock.style.display = "none";

          const tabsBlock = document.getElementById("widget-tabs");
          const widgetTabs = tabsBlock.querySelectorAll(".widget-tab");

          widgetTabs.forEach((el) => {
            el.style.display = "none";
          });

          const backButton = document.getElementById("widget-back-button");

          if (posts.length > 0) {
            tabsBlock.style.gap = 0;
            tabsBlock.innerHTML = `
                        ${posts
                          .map(
                            (post) => `
                            <div id="widget-post-${post.post_id}">
                                ${drawPost(post)}
                            </div>
                        `
                          )
                          .join("")}
                    `;
          } else {
            tabsBlock.innerHTML = `
                        <p class="widget-empty">There are not posts yet.</p>
                    `;
          }

          backButton.onclick = function () {
            header.style.background = "transparent";
            header.style.borderBottom = "none";
            header.style.justifyContent = "space-between";

            modal.style.width = "300px";

            tabsBlock.style.gap = "24px";

            seedHeaderWithCommunityInfo(community, header);

            searchBlock.style.display = "flex";

            const widgetTabs = tabsBlock.querySelectorAll(".widget-tab");

            widgetTabs.forEach((el) => {
              el.style.display = "flex";
            });

            seedTabsAndChannels(tabsData);
          };
        });
    }
  }

  function fetchData() {
    fetch(
      `${apiURL + `community/v1/community-channel?communityId=${communityId}`}`
    ) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        tabsData = data;
        seedTabsAndChannels(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch(
      `${
        apiURL +
        `community/v1/community-by-communityId?communityId=${communityId}`
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        community = {
          ...data.data[0].community,
          community_id: data.data[0].community_id,
        };
        const header = document.getElementById("widget-modal-header");
        seedHeaderWithCommunityInfo(community, header);

        let widgetFooter = document.getElementById("widget-footer");
        widgetFooter.innerHTML = `
                    <a target="_blank" href="${redirectToCommunity(
                      community.community_title,
                      community.community_id
                    )}" id="widget-view-full-community-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <span>View full community</span>
                    </a>
                `;
      });
  }

  // Handle incoming WebSocket messages

  // Function to handle WebSocket messages
  function handleWebSocketMessage(message, sessionID) {
    message = JSON.parse(message);
    notificationsMessages = [];
    console.log("WebSocket message:", message);
    console.log("WebSocket message type:", message.type);
    if (message.type === "delayed_message") {
      const content = message.content;
      console.log("content", content);
      if (content.predicted_components && !content.predicted_components.error) {
        console.log("within if");
        // Schedule the update of notifications after the delay
        setTimeout(() => {
          updateNotifications(content, sessionID);
        }, 1000); // Convert delay to milliseconds
      }
    }
  }

  function updateNotifications(content, sessionID) {
    console.log(content, "ctnt");
    console.log(sessionID, "session");
    // const isNotification = new BooleanWatcher(true, handleBooleanChange);
    // isNotification.setValue(false);
    notificationsMessages = [];
    setTimeout(() => {
      let arr = [];
      if (Array.isArray(content.predicted_components)) {

        content.predicted_components.forEach((component) => {
          const componentName = Array.isArray(component)
            ? component[0]
            : component;
          const newNotification = {
            title: `${componentName}`,
            text: `${componentName}`,
          };
          arr.push(newNotification);
        });
      }
      notificationsMessages = [...arr];
      console.log("notifictaion message:", notificationsMessages);
      
      const data = {
        session_id: sessionID,
        help_event: "POP-UP",
        help_content: "Pop Up triggered"
      };
      
      fetch(analyticsUrl, {
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Set the content type header
          'accept': 'application/json', // Set the accept header
          'x-api-key': apiKey
        },
        body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
      })
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      // isNotification.setValue(false);
      refreshNotificationsDisplay(sessionID);
      isNotification.setValue(false);
    }, 2000);
  }

  // Function to refresh the display of notifications
  async function refreshNotificationsDisplay(sessionID) {
    const notificationsContainer = document.getElementById(
      "widget-notifications-list"
    );
    notificationsContainer.innerHTML = ``;
    if (!notificationsContainer) {
      console.error("Notification container element not found");
      return;
    }
    const fetchPromises = notificationsMessages.map(
      async (notification, index) => {
        let response = await fetch(
          `${baseUrl}/log/session_support/${encodeURIComponent(
            notification?.title
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey
              // Add any additional headers if needed
            },
          }
        );
        if (response.status === 200) {
          let json = await response?.json();
          console.log(json, "response");
          if (json.status_code === 200) {
            return json.data;
          }
          else {
            return null;
          }
          
          
        }
        
        
      }
    );

    

    const monitorUrl = `${baseUrl}/log/session_monitor/`;
    const monitorData = {
      session_id: sessionID,
      monitor: "N"
    };
    try {
      const monitorResponse = await fetch(monitorUrl, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-api-key': apiKey
          },
          body: JSON.stringify(monitorData),
      });
      // Handle the monitorResponse if needed
    } catch (error) {
        console.error('Error in monitor API request:', error);
    };
    // const response = await Promise.all(fetchPromises).then(results => {
    //   const validResults = results.filter(result => result !== null); // Filter out null values
    //   console.log(validResults); // This will log only the data from successful responses
    // });
    // apiResponse = response;
    // console.log(apiResponse);

    // Using async/await style
    try {
      const results = await Promise.all(fetchPromises);
      const validResults = results.filter(result => result !== null);
      console.log(validResults);
      apiResponse = validResults;
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(apiResponse);
    // notificationsContainer.innerHTML = "";
    notificationsContainer.style.display = "none";
    setTimeout(() => {
      notificationsContainer.style.display = "flex";
      document.getElementById("widget-notifications").style.right = "205px";
      let notificationHtml = ``;
      apiResponse?.forEach((notification, index) => {
        const data = {
          session_id: sessionID,
          help_event: "END-GOAL",
          help_content: notification?.initial_support_question
        };
        
        fetch(analyticsUrl, {
          method: 'POST', // Specify the method
          headers: {
            'Content-Type': 'application/json', // Set the content type header
            'accept': 'application/json', // Set the accept header
            'x-api-key': apiKey
          },
          body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        notificationHtml += `
        <div  style="width: 450px;" class="widget-notifications-block hover-suggestion-fill" id="widget-notifications-block-${index}">
        <div style="justify-content: left;" class="widget-notifications-block-title" id="widget-notifications-block-title-${index}">
            <span style="width: 95%; word-break: break-word;">${notification?.initial_support_question}</span>
            <svg id="widget-notifications-block-title-arrow-${index}" width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0.94L2.5003 4L0 7.06L0.769744 8L4.04525 4L0.769744 0L0 0.94Z" fill="#504DE5"/>
            </svg>
        </div>
    </div>
          `;
        // notificationsContainer.innerHTML += notificationHtml;
      });

      notificationHtml += `
      <div style="width: 450px; padding: ;" class="widget-notifications-block-new" id="custom-search-block">
        <div style="display: flex; justify-content: center;" class="widget-notifications-block-title" id="widget-notifications-block-title-search">
          <div class='search-input-div-input' style="width: 100%; height: 40px; margin-top: 0px; display: flex; align-items: center; border-radius: 6px; border: 1px solid #F1F1F2; background: #FAFAFA;">
            <input type="text" placeholder="Enter what you're trying to achieve..." style="flex: 1; padding: 8px; border: none; outline: none; border-radius: 6px 0 0 6px; font-size: 14px;
            background: #FAFAFA; padding-left: 15px;"
            id="search-input"
            >
            <button id="open-final-popup" style="font-size: 14px;margin-top: 0px; height: 38px; padding: 10px; border: none; background: #FAFAFA; padding-right: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="8" viewBox="0 0 6 8" fill="none">
            <path d="M0.977356 0.94L3.47766 4L0.977356 7.06L1.7471 8L5.0226 4L1.7471 0L0.977356 0.94Z" fill="#504DE5"/>
          </svg>
            </button>
          </div>
        </div>
     </div>
     `;
      notificationsContainer.innerHTML = notificationHtml;

      //end
      apiResponse?.forEach((notification, index) => {
        document
          .getElementById(`widget-notifications-block-${index}`)
          .addEventListener("click", function () {
            console.log("handle click arrow", index);
            handleNotiArrowClick(index);
            const data = {
              session_id: sessionID,
              help_event: "DETAIL-GOAL",
              help_content: notification?.initial_support_question
            };
            
            fetch(analyticsUrl, {
              method: 'POST', // Specify the method
              headers: {
                'Content-Type': 'application/json', // Set the content type header
                'accept': 'application/json', // Set the accept header
                'x-api-key': apiKey
              },
              body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
            })
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          });
      });
      let finBut = document.getElementById("open-final-popup");
      finBut.addEventListener("click", function () {
        let loader = `<div class='loader'></div>`;

        // Append the loader to the button's parent
        document.getElementById("open-final-popup").innerHTML = loader;
        const searchInput = document.getElementById("search-input");
        const searchQuery = searchInput.value;
        
        const data = {
          session_id: sessionID,
          help_event: "MORE-HELP",
          help_content: searchQuery
        };
        
        fetch(analyticsUrl, {
          method: 'POST', // Specify the method
          headers: {
            'Content-Type': 'application/json', // Set the content type header
            'accept': 'application/json', // Set the accept header
            'x-api-key': apiKey
          },
          body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        openFinalScreen(searchQuery);
      });
      isNotification.setValue(true);
    }, 1500);
  }

  // function updateWidgetColor(completedStep) {
  //   const notificationBlocks = document.querySelectorAll('.widget-notifications-block-new');
    
  //   notificationBlocks.forEach((block, index) => {
  //     const circleSpan = block.querySelector('.widget-notifications-block-title span:first-child');
      
  //     if (circleSpan) {
  //       if (index < completedStep) {
  //         circleSpan.style.border = '2px solid #49B517';
  //       } else {
  //         circleSpan.style.border = 'none';
  //       }
  //     }
  //   });
  // }
  function updateWidgetColor(completedStep) {
    const notificationBlocks = document.querySelectorAll('.widget-notifications-block-new');
  
    notificationBlocks.forEach((block, index) => {
      const circleSpan = block.querySelector('.widget-notifications-block-title span:first-child');
  
      if (circleSpan && completedStep) {
        if (index < completedStep) {
          // circleSpan.style.backgroundColor = '#E8FFE0';
          // circleSpan.style.border = 'none';
          // circleSpan.innerHTML = '&#10004;'; // Add tick mark
          // circleSpan.style.color = '#49B517'; // Set tick mark color
          circleSpan.style.backgroundColor = '#d0f3b5'; // Light green background
          const tickSVG = `
            <svg width="14" height="10" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5L5 9L13 1" stroke="#46BD05" stroke-width="2" fill="none"/>
            </svg>`;
          circleSpan.innerHTML = tickSVG; // Insert the SVG for the tick mark
          circleSpan.style.textAlign = 'center'; // Center alignment
        } else {
          console.log(index,completedStep);
          circleSpan.style.backgroundColor = '#F1F1F2';
          circleSpan.style.border = 'none';
          // circleSpan.innerHTML = ''; // Remove index number
        }
      }
    });
  }

  // function updateWidgetColor(completedStep) {
  //   const notificationBlocks = document.querySelectorAll('.widget-notifications-block-new');
    
  //   notificationBlocks.forEach((block, index) => {
  //     const circleSpan = block.querySelector('.widget-notifications-block-title span:first-child');
      
  //     if (circleSpan) {
  //       if (index < completedStep) {
  //         circleSpan.style.border = '2px solid #49B517';
          
  //         // Add the green tick icon
  //         const tickIcon = document.createElement('span');
  //         tickIcon.innerHTML = '&#10004;'; // Unicode character for a tick mark
  //         tickIcon.style.color = '#49B517';
  //         tickIcon.style.fontSize = '12px';
  //         tickIcon.style.marginLeft = '4px';
          
  //         circleSpan.appendChild(tickIcon);
  //       } else {
  //         circleSpan.style.border = 'none';
          
  //         // Remove the tick icon if it exists
  //         const tickIcon = circleSpan.querySelector('span');
  //         if (tickIcon) {
  //           circleSpan.removeChild(tickIcon);
  //         }
  //       }
  //     }
  //   });
  // }

  // function updateWidgetColor(completedStep) {
  //   const notificationBlocks = document.querySelectorAll('.widget-notifications-block-new');
    
  //   notificationBlocks.forEach((block, index) => {
  //     const circleSpan = block.querySelector('.widget-notifications-block-title span:first-child');
      
  //     if (circleSpan) {
  //       if (index < completedStep) {
  //         circleSpan.style.backgroundColor = '#E8FFE0';
  //         circleSpan.style.color = 'transparent';
          
  //         // Add the green tick icon
  //         const tickIcon = document.createElement('span');
  //         tickIcon.innerHTML = '&#10004;'; // Unicode character for a tick mark
  //         tickIcon.style.color = '#49B517';
  //         tickIcon.style.fontSize = '16px';
  //         tickIcon.style.position = 'absolute';
  //         tickIcon.style.top = '50%';
  //         tickIcon.style.left = '50%';
  //         tickIcon.style.transform = 'translate(-50%, -50%)';
          
  //         // Remove existing tick icon if present
  //         const existingTickIcon = circleSpan.querySelector('span');
  //         if (existingTickIcon) {
  //           circleSpan.removeChild(existingTickIcon);
  //         }
          
  //         circleSpan.appendChild(tickIcon);
  //       } else {
  //         circleSpan.style.backgroundColor = '#F1F1F2';
  //         circleSpan.style.color = '#000000';
          
  //         // Remove the tick icon if it exists
  //         const tickIcon = circleSpan.querySelector('span');
  //         if (tickIcon) {
  //           circleSpan.removeChild(tickIcon);
  //         }
  //       }
  //     }
  //   });
  // }

  let htmlContent = `
        <div id="widget-overflow">
            <div id="widget-modal">
                <div id="widget-modal-header"></div>
                <div id="widget-search"></div>
                <div id="widget-tabs"></div>
                <div id="widget-footer"></div>
            </div>
        </div>
        <button class="widget-main-button" id="widget-main-button">
            <div id="widget-circle">?</div>
        </button>
        <div id="widget-notifications">
            <span id="widget-notifications-title">${
              apiResponse?.length > 0
                ? String.fromCodePoint(parseInt(helloEmoji, 16))
                : ""
            }</span>
            <div id="widget-notifications-list">

            </div>
        </div>
    `;

  window.addEventListener("sessionSupport", (e) => {
    const supportMessage = e.detail.supportContent;
    sessionID = e.detail.sessionID;
    console.log("widget support update:", supportMessage);
    // Parse the supportMessage to get the completed step
    const parsedMessage = JSON.parse(supportMessage);
    completedStep = parsedMessage.response;
    
    // Call the updateWidgetColor function with the completed step
    updateWidgetColor(completedStep);
    handleWebSocketMessage(supportMessage, sessionID);
  });
  window.addEventListener("sessionUpdate", (e) => {
    sessionID = e.detail.sessionID;
    console.log("widget session update");
    // Check the readyState periodically
    // setInterval(() => {
    //   console.log("WebSocket state:", webSocket.readyState);
    //   console.log("sessionIdHelpGen:",sessionId);

    // }, 3000);
    //   webSocket.onmessage = function(event) {
    //     const message = JSON.parse(event.data);
    //     console.log('WebSocket message:', message);
    //     handleWebSocketMessage(message);
    // };
  });

  document.addEventListener("DOMContentLoaded", function () {
    console.log("start dom");

    document.body.insertAdjacentHTML("beforeend", htmlContent);

    fetchData();

    let mainWidgetButton = document.getElementById("widget-main-button");
    let mainLayout = document.getElementById("widget-overflow");
    let searchBlock = document.getElementById("widget-search");
    // let sessionIdHelpGen = localStorage.getItem('sessionIdHelpGen');

    mainLayout.style.display = "none";

    const isNotification = new BooleanWatcher(false, handleBooleanChange);

    let widgetCircle = document.getElementById("widget-circle");
    let notificationList = document.getElementById("widget-notifications-list");

    mainWidgetButton.onclick = async function () {
      if(notificationList.style.display === 'flex'){
        notificationList.style.display = "none";
        widgetCircle.innerHTML = "?";

        const monitorUrl = `${baseUrl}/log/session_monitor/`;
        const monitorData = {
          session_id: sessionID,
          monitor: "Y"
        };
        try {
          const monitorResponse = await fetch(monitorUrl, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': apiKey
              },
              body: JSON.stringify(monitorData),
          });
          // Handle the monitorResponse if needed
        } catch (error) {
            console.error('Error in monitor API request:', error);
        };


        const data = {
          session_id: sessionID,
          help_event: "CLOSE-POPUP",
          help_content: "Pop up Closed"
        };
        
        fetch(analyticsUrl, {
          method: 'POST', // Specify the method
          headers: {
            'Content-Type': 'application/json', // Set the content type header
            'accept': 'application/json', // Set the accept header
            'x-api-key': apiKey
          },
          body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        


      }else{
        mainLayout.style.display = isNotification.getValue()
        ? "none"
        : mainLayout.style.display === "flex"
        ? "none"
        : "flex";
      notificationList.style.display = "none";
      widgetCircle.innerHTML =
        mainLayout.style.display === "flex"
          ? `
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7725 1.32466C11.8446 1.25269 11.9018 1.16724 11.9408 1.07318C11.9798 0.979113 11.9999 0.878283 12 0.776444C12.0001 0.674605 11.9801 0.573751 11.9412 0.47964C11.9022 0.38553 11.8452 0.300005 11.7732 0.22795C11.7012 0.155894 11.6158 0.0987197 11.5217 0.0596898C11.4277 0.0206599 11.3268 0.00053926 11.225 0.000476667C11.1232 0.000414074 11.0223 0.0204108 10.9282 0.059325C10.8341 0.0982392 10.7486 0.155309 10.6765 0.227275L5.9999 4.90396L1.32464 0.227275C1.17912 0.0817534 0.981751 -1.53333e-09 0.775955 0C0.570159 1.53332e-09 0.372791 0.0817534 0.227272 0.227275C0.081752 0.372798 1.5333e-09 0.570168 0 0.775967C-1.5333e-09 0.981767 0.081752 1.17914 0.227272 1.32466L4.90388 6L0.227272 10.6753C0.155218 10.7474 0.0980613 10.8329 0.0590659 10.9271C0.0200705 11.0212 0 11.1221 0 11.224C0 11.3259 0.0200705 11.4268 0.0590659 11.521C0.0980613 11.6151 0.155218 11.7007 0.227272 11.7727C0.372791 11.9182 0.570159 12 0.775955 12C0.877855 12 0.978757 11.9799 1.0729 11.9409C1.16704 11.9019 1.25258 11.8448 1.32464 11.7727L5.9999 7.09603L10.6765 11.7727C10.822 11.9181 11.0193 11.9996 11.225 11.9995C11.4307 11.9994 11.6279 11.9176 11.7732 11.772C11.9185 11.6265 12.0001 11.4292 12 11.2236C11.9999 11.0179 11.918 10.8207 11.7725 10.6753L7.09592 6L11.7725 1.32466Z" fill="black"/>
                </svg>
            `
          : "?";
      isNotification.setValue(false);
      }
     
    };

    searchBlock.innerHTML = `
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33332 14C8.81247 13.9997 10.249 13.5045 11.4142 12.5933L15.0775 16.2567L16.2558 15.0783L12.5925 11.415C13.5042 10.2497 13.9996 8.81285 14 7.33332C14 3.65749 11.0092 0.666656 7.33332 0.666656C3.65749 0.666656 0.666656 3.65749 0.666656 7.33332C0.666656 11.0092 3.65749 14 7.33332 14ZM7.33332 2.33332C10.0908 2.33332 12.3333 4.57582 12.3333 7.33332C12.3333 10.0908 10.0908 12.3333 7.33332 12.3333C4.57582 12.3333 2.33332 10.0908 2.33332 7.33332C2.33332 4.57582 4.57582 2.33332 7.33332 2.33332Z" fill="#B6B7B9"/>
            </svg>
            <input placeholder="Search..." id="widget-search-input" type="text"/>
        `;

    const debouncedInputChange = debounce(handleInputChange, 500);

    // setTimeout(() => {
    //   isNotification.setValue(true);
    // }, 2000);

    document
      .getElementById("widget-search-input")
      .addEventListener("input", debouncedInputChange);
    document
      .getElementById("widget-search-input")
      .addEventListener("focus", function () {
        searchBlock.style.border = "1px solid #504de5";
        searchBlock.style.boxShadow = "0 0 10px -3px #504de5";
      });

    document
      .getElementById("widget-search-input")
      .addEventListener("blur", function () {
        searchBlock.style.border = "1px solid #00000014";
        searchBlock.style.boxShadow = "none";
      });
  });
})();
