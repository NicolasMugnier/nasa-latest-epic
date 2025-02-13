import React, { useEffect, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import FrameSDK from "@farcaster/frame-sdk";

function FarcasterFrameProvider({ children }) {
    useEffect(() => {
      const init = async () => {
        console.log("Initializing Frame");
        setTimeout(() => {
          FrameSDK.actions.ready();
          console.log("Frame is ready");
        }, 500);
      };
      init();
    }, []);
    return <>{children}</>;
}

const App = () => {
  useEffect(() => {

    const fetchData = async () => {
      try {
        const ipfsHash = "Qmcw111vvxnrwXjFft5dpj1dXJD4Lr1TX26qPLFXt9ggTY";
        const response = await fetch("https://ipfs.io/ipfs/" + ipfsHash);
        const data = await response.json();

        document.getElementById('main-image-caption').innerHTML = data.images_collected_at;
        const mainImageUrl = 'https://ipfs.io/ipfs/' + data.asset_ipfs_hash;
        const mainImage = document.getElementById("main-image");
        mainImage.src = mainImageUrl;

        const thumbnailsContainer = document.getElementById("thumbnails");

        const img = document.createElement("img");
        img.src = mainImageUrl;
        img.className = "thumbnail";
        img.onclick = () => {
          mainImage.src = mainImageUrl;
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
    };

    fetchData();
  }, []);

  return (
    <div>
      <section id="carousel-container">
        <figure>
          <img id="main-image" src="" alt="Nasa Earth Polychromatic Imaging Camera" />
          <figcaption id="main-image-caption"></figcaption>
        </figure>
        <div id="thumbnails"></div>
      </section>

      <section id="about">
        <p>
          Photos have been collected by Nasa DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument. Uniquely positioned at the Earth-Sun Lagrange point, EPIC provides full disc imagery of the Earth and captures unique perspectives of certain astronomical events such as lunar transits using a 2048x2048 pixel CCD (Charge Coupled Device) detector coupled to a 30-cm aperture Cassegrain telescope.
        </p>
        <p>
          The animated image has been generated using Nasa imagery and stored on IPFS. Pinata is used to pin the image to the IPFS network. The image is then displayed on the website using the IPFS gateway.
        </p>
      </section>

      <footer className="footer">
        <div className="info">
          Official <a href="https://epic.gsfc.nasa.gov">Nasa EPIC</a> website<br />
          See on <a href="https://github.com/NicolasMugnier/nasa-latest-epic">GitHub</a>
        </div>
        <p>&copy; 2025 - anyvoid.eth</p>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <FarcasterFrameProvider>
            <App />
        </FarcasterFrameProvider>
    </StrictMode>
);
