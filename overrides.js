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
	</div>
`;
twitchFrame.insertAdjacentHTML("beforebegin", titleBarTemplate);

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
