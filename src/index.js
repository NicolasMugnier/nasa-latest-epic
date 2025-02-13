import FrameSDK from "@farcaster/frame-sdk";

document.addEventListener("DOMContentLoaded", async function() {
    setTimeout(() => {
        FrameSDK.actions.ready();
        console.log("Farcaster Frame is ready!");
    }, 500);

    try {
        const ipfsHash = "Qmcw111vvxnrwXjFft5dpj1dXJD4Lr1TX26qPLFXt9ggTY";
        const response = await fetch("https://ipfs.io/ipfs/"+ipfsHash);
        const data = await response.json();

        document.getElementById('main-image-caption').innerHTML = data.images_collected_at;
        const mainImageUrl = 'https://ipfs.io/ipfs/'+data.asset_ipfs_hash;
        const mainImage = document.getElementById("main-image");
        mainImage.src = mainImageUrl

        const thumbnailsContainer = document.getElementById("thumbnails");

        const img = document.createElement("img");
        img.src = mainImageUrl
        img.className = "thumbnail";
        img.onclick = () => {
            mainImage.src = mainImageUrl
        };
        thumbnailsContainer.appendChild(img);

        data.images.forEach(image => {
            const img = document.createElement("img");
            img.src = image.thumbnail;
            img.className = "thumbnail";
            img.onclick = () => {
                mainImage.src = image.url;
            };
            thumbnailsContainer.appendChild(img);
        });

    } catch (error) {
        console.error("Erreur lors du chargement du JSON:", error);
    }
});
