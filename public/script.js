async function loadCoffees() {
const response = await fetch("/coffees");
const coffees = await response.json();

const cards = document.querySelectorAll(".coffee-card");

coffees.forEach((coffee, index) => {
cards[index].querySelector(".votes").textContent =
`⭐ ${coffee.votes} votes`;

cards[index].querySelector("button").onclick = () =>
voteCoffee(coffee.id);
});

updateLeaderboard(coffees);
}

async function voteCoffee(id) {
const response = await fetch(`/coffees/${id}/vote`, {
method: "POST"
});

const updatedCoffee = await response.json();

const cards = document.querySelectorAll(".coffee-card");
const coffeeIndex = updatedCoffee.id - 1;

cards[coffeeIndex].querySelector(".votes").textContent =
 `⭐ ${updatedCoffee.votes} votes`;

loadCoffees();
}

function updateLeaderboard(coffees) {
const leaderboard = document.getElementById("leaderboard-list");

const sortedCoffees = [...coffees].sort(
(a, b) => b.votes - a.votes
);

leaderboard.innerHTML = "";

sortedCoffees.forEach((coffee, index) => {
const item = document.createElement("div");

item.className = "leaderboard-item";

item.innerHTML = `
<span>${index + 1}. ${coffee.name}</span>
<strong>⭐ ${coffee.votes} votes</strong>
`;

leaderboard.appendChild(item);
});
}

loadCoffees();