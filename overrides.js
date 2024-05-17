// .tw-number-badge__badge = notifications

// listen for notifications
const targetNode = document.body;
const config = { childList: true, subtree: true };

const callback = function(mutationsList, observer) {
  for(const mutation of mutationsList) {
	if (mutation.type === 'childList') {
	  mutation.addedNodes.forEach(node => {
		if (node.nodeType === 1 && node.classList.contains('tw-notification')) {
		  if (node.innerText.includes('is live')) {
			window.electronAPI.showNotification('Twitch Notification', node.innerText);
		  }
		}
	  });
	}
  }
};

window.electronAPI.getOS().then(os => {
	const osContentDiv = document.getElementById('os-specific-content');
	if (os === 'win32') {
	  document.body.classList.add('os-win');
	} else if (os === 'darwin') {
	  document.body.classList.add('os-mac');
	} else if (os === 'linux') {
	  document.body.classList.add('os-linux');
	} else {
	  document.body.classList.add('os-other');
	}
});

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

const twitchFrame = document.getElementById("root");

const oldTitleBarTemplate = `
	<div class="twtchTitlebar">
		<div class="buttonGroup">
			<button class="btn" id="btnBack">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 48 48"><path d="M20 44 0 24 20 4 22.8 6.85 5.65 24 22.8 41.15Z"/></svg></button>
			<button class="btn" id="btnForward">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M15.2 43.9 12.4 41.05 29.55 23.9 12.4 6.75 15.2 3.9 35.2 23.9Z"/></svg></button>
			<button class="btn" id="btnRefresh">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24 40Q17.35 40 12.675 35.325Q8 30.65 8 24Q8 17.35 12.675 12.675Q17.35 8 24 8Q28.25 8 31.45 9.725Q34.65 11.45 37 14.45V8H40V20.7H27.3V17.7H35.7Q33.8 14.7 30.85 12.85Q27.9 11 24 11Q18.55 11 14.775 14.775Q11 18.55 11 24Q11 29.45 14.775 33.225Q18.55 37 24 37Q28.15 37 31.6 34.625Q35.05 32.25 36.4 28.35H39.5Q38.05 33.6 33.75 36.8Q29.45 40 24 40Z"/></svg>
			</button>
		</div>
		<div class="settingsGroup">
			<button class="btn" id="btnSettings">
				<svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25"><path d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410-480q0-29 20.5-49.5T480-550q29 0 49.5 20.5T550-480q0 29-20.5 49.5T480-410Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z"></path></svg>
			</button>
		</div>
	</div>
`;

const titleBarTemplate = `
<div class="twitchTitlebar">
  <div class="actions">
    <button id="btnBack">
		<svg fill="none" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
			<path d="m180.74 227.14c-3.895 3.964-10.275 3.992-14.204 0.062l-92.462-92.461c-3.9053-3.906-3.9053-10.237 0-14.142l92.462-92.462c3.929-3.9297 10.309-3.9015 14.204 0.0629l0.917 0.9327c3.846 3.915 3.818 10.198-0.063 14.079l-77.387 77.387c-3.905 3.905-3.905 10.236 0 14.142l77.387 77.387c3.881 3.88 3.909 10.164 0.063 14.079l-0.917 0.933z" fill="#000"/>
		</svg>
    </button>
    <button id="btnForward">
		<svg fill="none" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
			<path d="m75.263 27.863c3.8948-3.9643 10.275-3.9925 14.204-0.0628l92.462 92.461c3.905 3.906 3.905 10.237 0 14.142l-92.462 92.462c-3.9297 3.93-10.31 3.902-14.204-0.063l-0.9163-0.932c-3.8464-3.915-3.8186-10.199 0.0623-14.08l77.387-77.387c3.905-3.905 3.905-10.236 0-14.142l-77.387-77.387c-3.8809-3.8808-3.9087-10.164-0.0623-14.079l0.9163-0.9328z" fill="#000"/>
		</svg>
    </button>
    <button id="btnRefresh">
      <svg fill="none" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="m128 213.33c-23.644 0-43.778-8.311-60.4-24.933s-24.933-36.756-24.933-60.4 8.3111-43.778 24.933-60.4c16.622-16.622 36.756-24.933 60.4-24.933 15.111 0 28.356 3.0667 39.733 9.2 11.378 6.1334 21.245 14.533 29.6 25.2v-26.4c0-4.4183 3.582-8 8-8 4.419 0 8 3.5817 8 8v49.733c0 5.523-4.477 10-10 10h-49.733c-4.418 0-8-3.582-8-8 0-4.4183 3.582-8 8-8h36.8c-6.756-10.667-15.378-19.289-25.867-25.867s-22.666-9.8667-36.533-9.8667c-19.378 0-35.778 6.7111-49.2 20.133-13.422 13.422-20.133 29.822-20.133 49.2s6.7111 35.778 20.133 49.2 29.822 20.133 49.2 20.133c14.756 0 28.267-4.222 40.533-12.666 10.629-7.317 18.455-16.67 23.478-28.058 1.404-3.182 4.455-5.409 7.934-5.409 5.393 0 9.313 5.154 7.275 10.146-5.733 14.043-14.807 25.683-27.22 34.921-15.289 11.377-32.622 17.066-52 17.066z" fill="#000" />
      </svg>
    </button>
	<button id="btnSettings">
		<svg fill="none" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
			<path d="m106.31 55.435 7.087-35.435h29.522l7.087 35.435c0.424 2.1182 1.802 3.9221 3.734 4.8882l3.497 1.7485c2.206 1.1031 4.83 0.9637 6.907-0.367l29.556-18.937 21.945 18.785-21.036 28.048c-0.909 1.2116-1.4 2.6854-1.4 4.1999v3.1604c0 3.2123 2.186 6.0123 5.302 6.7913l37.806 9.451v32.133l-35.024 4.67c-2.3 0.306-4.298 1.732-5.336 3.808l-1.691 3.381c-1.143 2.286-0.949 5.014 0.506 7.115l21.199 30.621-21.361 21.361-31.306-16.857c-1.02-0.549-2.161-0.836-3.319-0.836h-3.267c-3.301 0-6.153 2.305-6.845 5.533l-6.897 32.186h-29.579l-7.051-35.256c-0.493-2.463-2.267-4.474-4.65-5.268l-5.9364-1.979c-2.2785-0.759-4.7874-0.298-6.6463 1.223l-25.446 20.819-23.079-20.981 20.777-27.703c1.5908-2.121 1.8467-4.959 0.661-7.33l-1.704-3.408c-0.9661-1.932-2.77-3.31-4.8882-3.734l-35.435-7.087v-31.937l34.837-4.645c2.6516-0.354 4.8698-2.187 5.7157-4.725l1.983-5.9492c0.6968-2.0903 0.3687-4.3866-0.8854-6.1981l-21.053-30.409 23.203-18.984 28.288 18.859c2.0901 1.3934 4.7666 1.56 7.0134 0.4366l3.4759-1.7377c1.932-0.9661 3.31-2.77 3.733-4.8882zm4.628-45.435c-3.337 0-6.21 2.3552-6.864 5.6272l-7.2818 36.408-0.606 0.303-28.686-19.124c-2.56-1.7067-5.9343-1.5417-8.3156 0.4066l-27.063 22.143c-2.8239 2.3104-3.3995 6.4024-1.3227 9.4022l21.775 31.452-0.9163 2.7488-35.583 4.7447c-3.4777 0.463-6.0749 3.43-6.0749 6.938v37.024c0 3.336 2.3552 6.209 5.6272 6.864l36.408 7.281 0.2186 0.438-21.302 28.403c-2.1664 2.888-1.7803 6.951 0.8913 9.38l27.014 24.558c2.5671 2.333 6.4563 2.435 9.1414 0.238l26.169-21.411 2.7156 0.905 7.1924 35.961c0.654 3.272 3.527 5.627 6.864 5.627h34.463c3.301 0 6.153-2.306 6.845-5.533l6.897-32.186h0.086l32.605 17.556c2.722 1.466 6.083 0.973 8.268-1.213l24.711-24.71c2.392-2.393 2.731-6.153 0.805-8.935l-21.613-31.219 0.185-0.37 36.052-4.807c3.478-0.464 6.075-3.43 6.075-6.939v-37.101c0-3.212-2.186-6.012-5.302-6.791l-37.691-9.4229 22.008-29.345c2.215-2.9527 1.756-7.1176-1.048-9.5177l-25.774-22.063c-2.345-2.0076-5.729-2.2417-8.328-0.5762l-29.998 19.22-0.66-0.33-7.282-36.408c-0.654-3.272-3.527-5.6272-6.864-5.6272h-34.44zm60.769 117.99c0 24.253-19.405 43.717-43.1 43.717-23.694 0-43.099-19.464-43.099-43.717 0-24.254 19.405-43.717 43.099-43.717 23.695 0 43.1 19.463 43.1 43.717zm10 0c0 29.667-23.774 53.717-53.1 53.717-29.326 0-53.099-24.05-53.099-53.717 0-29.667 23.774-53.717 53.099-53.717 29.326 0 53.1 24.05 53.1 53.717z" clip-rule="evenodd" fill="#000" fill-rule="evenodd"/>
		</svg>
	</button>
  </div>
  <div class="actions windows">
    <button id="btnMinimize">
		<svg fill="none" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        	<path d="m73 127c0-5.523 4.4772-10 10-10h90c5.523 0 10 4.477 10 10v1c0 5.523-4.477 10-10 10h-90c-5.5228 0-10-4.477-10-10v-1z" clip-rule="evenodd" fill="#000" fill-rule="evenodd" />
      </svg>
	</button>
    <button id="btnMaximize">
		<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        	<mask id="path-1-inside-1_1_6" fill="white">
          		<rect x="57" y="57" width="141" height="142" rx="10" />
        	</mask>
        	<rect x="57" y="57" width="141" height="142" rx="10" stroke="black" stroke-width="42" mask="url(#path-1-inside-1_1_6)" />
      </svg>
    </button>
    <button id="btnClose">
		<svg fill="none" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        	<path d="m92.778 77.929c-3.9053-3.9052-10.237-3.9052-14.142 0l-0.7071 0.7071c-3.9052 3.9053-3.9052 10.237 0 14.142l35.929 35.929-32.08 32.08c-3.9053 3.905-3.9053 10.237 0 14.142l0.7071 0.707c3.9052 3.905 10.237 3.905 14.142 0l32.08-32.08 35.489 35.489c3.905 3.905 10.237 3.905 14.142 0l0.707-0.707c3.905-3.905 3.905-10.237 0-14.142l-35.489-35.489 31.56-31.56c3.906-3.9053 3.906-10.237 0-14.142l-0.707-0.7072c-3.905-3.9052-10.237-3.9052-14.142 1e-4l-31.56 31.56-35.929-35.929z" clip-rule="evenodd" fill="#000" fill-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>
`;

const settingsModalTemplate = `
	<div class="twtchSettingsModalOverlay" id="twtchSettings">
		<div class="twtchSettingsModal">
			<div class="modalHeader">
				Twtch Settings
			</div>
			<div class="modalSection">
				<div class="modalSectionHeader">
					Enhancements
				</div>
				<div class="setting">
					<label for="enable-better-twitch-tv">Enable Better Twitch TV</label>
					<input type="checkbox" id="enable-better-twitch-tv"/>
				</div>
			</div>
			<div class="modalFooter">
				<button id="btnSettingsOverlay_Save">Save</button>
				<button id="btnSettingsOverlay_Cancel">Cancel</button>
			</div>
		</div>
	</div>
`;
twitchFrame.insertAdjacentHTML("beforebegin", titleBarTemplate);
// twitchFrame.insertAdjacentHTML("beforebegin", settingsModalTemplate);

document.getElementsByClassName("twitchTitlebar")[0].addEventListener("click", toolbarActions);

function toolbarActions(event) {
	const element = event.target;
	if (element && (element.parentElement?.id === "btnBack" || element.id === "btnBack")) {
		window.history.back();
	}
	if (element && (element.parentElement?.id === "btnForward" || element.id === "btnForward")) {
		window.history.forward();
	}
	if (element && (element.parentElement?.id === "btnRefresh" || element.id === "btnRefresh")) {
		window.location.reload();
	}
	if (element && (element.parentElement?.id === "btnMinimize" || element.id === "btnMinimize")) {
		window.electronAPI.minimizeWindow();
	}
	if (element && (element.parentElement?.id === "btnMaximize" || element.id === "btnMaximize")) {
		window.electronAPI.toggleMaximizeWindow();
	}
	if (element && (element.parentElement?.id === "btnClose" || element.id === "btnClose")) {
		window.electronAPI.closeWindow();
	}
	if (element && (element.parentElement?.id === "btnSettings" || element.id === "btnSettings")) {
		document.getElementById("twtchSettings").style.display = "flex";
	}
	if (element && (element.parentElement?.id === "btnSettingsOverlay_Cancel" || element.id === "btnSettingsOverlay_Cancel")) {
		document.getElementById("twtchSettings").style.display = "none";
	}
}

(function betterttv() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.betterttv.net/betterttv.js';
    var head = document.getElementsByTagName('head')[0];
    if (!head) return;
    head.appendChild(script);
	console.log("its happening!!!!!")
})()

window.addEventListener('load', function () {
	setTimeout(function() {
		document.querySelector("[aria-label=\"Pause (space/k)\"]").click()
	}, 100);
	
	setTimeout(function() {
		document.querySelector(".front-page-carousel").remove();
	}, 100)

	setTimeout(function() {
		document.querySelector("body").insertAdjacentHTML("beforebegin", "<div class='tw-notification'>Test Test test<div>test</div><p>test</p><span>test</span></div>");
	})


	setTimeout(function() {
		const anchorLinks = document.querySelectorAll("a");
		console.log(anchorLinks.length)
		anchorLinks.forEach(function(anchorLink) {
			anchorLink.setAttribute("oncontextmenu", "return false;")
		});
	}, 100)
});