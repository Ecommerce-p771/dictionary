
document.getElementById("searchBtn").addEventListener("click", async () => {


    // এই কোডটি searchBtn আইডি সহ বাটনে একটি ক্লিক ইভেন্ট লিসেনার যোগ করছে।

    const word = document.getElementById("wordInput").value.trim()

    // এখানে wordInput আইডি সহ ইনপুট ফিল্ড থেকে শব্দ সংগ্রহ করা হচ্ছে এবং .trim() ব্যবহার করে অতিরিক্ত স্পেস মুছে ফেলা হচ্ছে।
    if (!word) return alert("Please enter a word");


    // যদি ব্যবহারকারী কোনো শব্দ না দেয়, তবে একটি সতর্কবার্তা (alert) দেখানো হবে "Please enter a word"। এরপর ফাংশনটি এখানেই থেমে যাবে 

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "🔎 Searching...";

    // এখানে result আইডি সহ div-এ "🔎 Searching..." বার্তা সেট করা হচ্ছে, যাতে ব্যবহারকারী জানেন যে অনুসন্ধান চলছে।

    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        // fetch() ব্যবহার করে নির্দিষ্ট শব্দের জন্য একটি এপিআই অনুরোধ করা হচ্ছে

        const data = await res.json();
        // এপিআই-এর JSON ডেটা নেওয়া হচ্ছে।

        if (data.title) {
            resultDiv.innerHTML = "❌ Word not found!";
            // যদি এপিআই থেকে title থাকে, তবে বুঝতে হবে যে শব্দটি পাওয়া যায়নি

        } else {
            const meaning = data[0].meanings[0].definitions[0].definition;
            const pronunciation = data[0].phonetics[0]?.text || "No pronunciation available";

            // যদি শব্দটি পাওয়া যায়, তবে প্রথমে এর মানে (meaning) এবং উচ্চারণ (pronunciation) বের করা হচ্ছে।

            resultDiv.innerHTML = `<h3>🔠 ${word}</h3><p><strong>📌 Meaning:</strong> ${meaning}</p><p><strong>🔊 Pronunciation:</strong> ${pronunciation}</p>`;
            // এরপর resultDiv.innerHTML ব্যবহার করে, শব্দ, মানে এবং উচ্চারণ (যদি পাওয়া যায়) HTML ফরম্যাটে দেখানো হচ্ছে।

        }
    } catch (error) {
        resultDiv.innerHTML = "⚠️ Error fetching data. Try again!";
    }
    // নেটওয়ার্ক সমস্যা), তাহলে "⚠️ Error fetching data. Try again!" বার্তা দেখানো হবে।
});