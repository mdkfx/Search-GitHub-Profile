const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("search-btn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
    return `
        <div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" alt="avatar"/>
                    </div>
                    <div class="self">
                        <h1>${profile.name || "No Name"}</h1>
                        <h1>${profile.login}</h1>
                    </div>
                </div>
                <a href="${profile.html_url}" target="_blank">
                    <button class="primary-btn">Check Profile</button>
                </a>
            </div>

            <div class="about">
                <h2>About</h2>
                <p>${profile.bio || "No bio available"}</p>
            </div>

            <div class="status-item">
                <h3>Followers</h3>
                <p>${profile.followers}</p>
            </div>
            <div class="status-item">
                <h3>Following</h3>
                <p>${profile.following}</p>
            </div>
            <div class="status-item">
                <h3>Repos</h3>
                <p>${profile.public_repos}</p>
            </div>
        </div>
    `;
};

const fetchProfile = async () => {
    const userName = searchInputEl.value.trim();

    if (!userName) {
        loadingEl.innerText = "Enter a username";
        loadingEl.style.color = "red";
        return;
    }

    loadingEl.innerText = "Loading...";
    loadingEl.style.color = "white";

    try {
        const res = await fetch(`${url}/${userName}`);

        if (!res.ok) {
            throw new Error("User not found");
        }

        const data = await res.json();
        loadingEl.innerText = "";
        profileContainerEl.innerHTML = generateProfile(data);

    } catch (error) {
        loadingEl.innerText = error.message;
        loadingEl.style.color = "red";
        profileContainerEl.innerHTML = "";
    }
};

searchButtonEl.addEventListener("click", fetchProfile);
