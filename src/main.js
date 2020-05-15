class Blog {
	constructor() {
		this.setInitVariables();
		this.registerEvent();
		this.likedSet = new Set();
	}

	setInitVariables(){
		this.blogList = document.querySelector(".blog-list > ul");
	}

	registerEvent(){
		const startBtn = document.querySelector(".start");
		const dataURL = "/data/data.json";

		startBtn.addEventListener("click", () => {
			this.setInitData(dataURL);
		});

		this.blogList.addEventListener("click", ({target}) => {
			const targetclassName = target.className;
			if(targetclassName !== "like" && targetclassName !== "unlike") return;

			const postTitle = target.previousElementSibling.textContent;
			if(targetclassName === "unlike"){
				this.likedSet.delete(postTitle);
				target.className = "like";
				target.innerText = "찜하기";
			} else {
				this.likedSet.add(postTitle);
				target.className = "unlike";
				target.innerText = "찜취소";
			}
			this.updateLikedList();
		});
	}

	updateLikedList() {
		const ul = document.querySelector(".like-list > ul");
		let likedSum = "";

		this.likedSet.forEach( (v) => {
			likedSum += `<li> ${v} </li>`
		})

		ul.innerHTML = likedSum;
	}

	setInitData(dataURL) {
		this.getData(dataURL, this.insertPosts.bind(this));
	}

	getData(dataURL, fn) {
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load", () => {
			const list = JSON.parse(oReq.responseText).body;
			fn(list);
		});
		oReq.open('GET', dataURL);
		oReq.send();
	}

	insertPosts(list) {
		list.forEach((v) => {
			this.blogList.innerHTML += `
			<li>
				<a href=${v.link}> ${v.title}</a>
				<div class="like">찜하기</div>
			</li>
			`;
		})
	}
}

export default Blog;
