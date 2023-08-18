// .tw-number-badge__badge = notifications

const twitchFrame = document.getElementById("root");

const titleBarTemplate = `
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
twitchFrame.insertAdjacentHTML("beforebegin", settingsModalTemplate);

document.addEventListener("click", toolbarActions);
function toolbarActions(event) {
	const element = event.target;
	console.log(element.parentElement.id);
	if (element.parentElement.id == "btnBack") {
		window.history.back();
	}
	if (element.parentElement.id == "btnForward") {
		window.history.forward();
	}
	if (element.parentElement.id == "btnRefresh") {
		window.location.reload();
	}
	if (element.parentElement.id == "btnSettings") {
		document.getElementById("twtchSettings").style.display = "flex";
	}
	if (element.parentElement.id == "btnSettingsOverlay_Cancel") {
		document.getElementById("twtchSettings").style.display = "none";
	}
}

window.addEventListener('load', function () {
	document.querySelector(".front-page-carousel").remove();

	setTimeout(function() {
		const anchorLinks = document.querySelectorAll("a");
		console.log(anchorLinks.length)
		anchorLinks.forEach(function(anchorLink) {
			anchorLink.setAttribute("oncontextmenu", "return false;")
		});
	}, 1000)
	

});


(function betterttv() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.betterttv.net/betterttv.js';
    var head = document.getElementsByTagName('head')[0];
    if (!head) return;
    head.appendChild(script);
})()