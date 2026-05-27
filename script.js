const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
  });
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((el) => observer.observe(el));

const splitLines = document.querySelectorAll(".hero__split-line");
const animatedLineLetters = [];

const buildCenterOutGroups = (count) => {
  const groups = [];
  if (count <= 0) {
    return groups;
  }

  if (count % 2 === 1) {
    const center = Math.floor(count / 2);
    groups.push([center]);
    for (let offset = 1; center - offset >= 0 || center + offset < count; offset += 1) {
      const group = [];
      if (center - offset >= 0) {
        group.push(center - offset);
      }
      if (center + offset < count) {
        group.push(center + offset);
      }
      groups.push(group);
    }
  } else {
    const rightCenter = count / 2;
    const leftCenter = rightCenter - 1;
    groups.push([leftCenter, rightCenter]);
    for (
      let offset = 1;
      leftCenter - offset >= 0 || rightCenter + offset < count;
      offset += 1
    ) {
      const group = [];
      if (leftCenter - offset >= 0) {
        group.push(leftCenter - offset);
      }
      if (rightCenter + offset < count) {
        group.push(rightCenter + offset);
      }
      groups.push(group);
    }
  }

  return groups;
};

splitLines.forEach((line) => {
  const text = line.getAttribute("data-text") || "";
  line.innerHTML = "";
  const letters = [];
  const totalLetters = Array.from(text).filter((char) => char !== " ").length;
  const midpoint = (totalLetters - 1) / 2;
  let letterIndex = 0;

  Array.from(text).forEach((char) => {
    if (char === " ") {
      const spacer = document.createElement("span");
      spacer.className = "hero__space";
      spacer.innerHTML = "&nbsp;";
      line.appendChild(spacer);
      return;
    }

    const span = document.createElement("span");
    span.className = "hero__letter";
    const pushDirection = letterIndex < midpoint ? -1 : 1;
    span.style.setProperty("--push-direction", pushDirection.toString());
    span.textContent = char;
    line.appendChild(span);
    letters.push(span);
    letterIndex += 1;
  });

  if (letters.length > 0) {
    animatedLineLetters.push({
      letters,
      groups: buildCenterOutGroups(letters.length),
    });
  }
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const runHeroTextLoop = async () => {
  if (animatedLineLetters.length === 0) {
    return;
  }

  const showStepMs = 90;
  const hideStepMs = 60;
  const holdMs = 1700;
  const maxSteps = Math.max(...animatedLineLetters.map((line) => line.groups.length));

  while (true) {
    for (let step = 0; step < maxSteps; step += 1) {
      animatedLineLetters.forEach((line) => {
        const group = line.groups[step] || [];
        group.forEach((index) => {
          line.letters[index]?.classList.add("is-active");
        });
      });
      await sleep(showStepMs);
    }

    await sleep(holdMs);

    for (let step = maxSteps - 1; step >= 0; step -= 1) {
      animatedLineLetters.forEach((line) => {
        const group = line.groups[step] || [];
        group.forEach((index) => {
          line.letters[index]?.classList.remove("is-active");
        });
      });
      await sleep(hideStepMs);
    }

    await sleep(450);
  }
};

runHeroTextLoop();
