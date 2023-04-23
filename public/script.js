const ThreadDOM = document.querySelector(".thread-section");
const form = document.querySelector(".form-section");
// data fetching
const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");

let inputText;
let inputContentText;

//最初はスレッドの全てを読み込む
const getAllThreads = async () => {
    try {
        let allThreads = await axios.get("/api/v1/threads");
        let { data } = allThreads;
        // console.log(data);

        //出力
        allThreads = data.map((thread) => {
            const { title, content } = thread;
            console.log(title, content);
            return `
            <div class="single-thread">
                <h3>${title}</h3>
                <p>${content}</p>
            </div>
            `
        }).join("");
        ThreadDOM.innerHTML = allThreads;
    } catch (err) {
        console.log(err);
    }
};

getAllThreads();

//postメソッド
//タイトルと内容を打ち込んだらpostメソッドを実装してデータ追加。
inputTextDOM.addEventListener("change", (e) => {
    inputText = e.target.value;
    // console.log(inputText);
});
inputContentDOM.addEventListener("change", (e) => {
    inputContentText = e.target.value;
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (inputText && inputContentText) {
        console.log("add data");
        try {
            await axios.post("/api/v1/thread", {
                title: inputText,
                content: inputContentText,
            });
        } catch (err) {
            console.log(err);
        }
    }
})