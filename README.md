# Vanora Case – Rick and Morty Characters

A character listing application built with **Next.js** that consumes the **Rick and Morty API**.
Users can browse characters, filter them by different attributes and view detailed information.

---

## 🚀 Tech Stack

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **CSS Modules**
* **Rick and Morty API**

---

## ✨ Features

* Character listing
* Character detail page
* Filtering by:

  * Name
  * Species
  * Gender
  * Status
* Pagination / Load More
* Responsive layout

---

## 📂 Project Structure

```
src
│
├── app
│   ├── page.tsx
│   └── character
│       └── [id]
│           └── page.tsx
│
├── models
│   └── character.ts
│
├── services
│   └── characterService.ts
│
├── hooks
│   └── useDebounce.ts
│
└── views
    ├── components
    │   ├── container
    │   ├── header
    │   ├── footer
    │   ├── characterCard
    │   ├── filters
    │   ├── backButton
    │   └── heroLogo
    │
    └── sections
        └── list
```

---

## ⚙️ Getting Started

Clone the repository

```
git clone https://github.com/kadirkar22/rick-and-morty-nextjs-case.git
```

Install dependencies

```
npm install
```

Run the development server

```
npm run dev
```

Open in browser

```
http://localhost:3000
```

---

## 🌐 API

This project uses the public API:

https://rickandmortyapi.com

Example endpoint:

```
https://rickandmortyapi.com/api/character
```

---

## 📸 Screenshots

### Character List (Desktop)

![Character List](./screens/desktopList.png)

### Character Detail (Desktop)

![Character Detail](./screens/desktopDetail.png)

### Character List (Mobile)

![Character List](./screens/mobileList.png)

### Character Filter (Mobile)

![Character List](./screens/mobileFilter.png)

### Character Detail (Mobile)

![Character Detail](./screens/mobileDetail.png)

---



