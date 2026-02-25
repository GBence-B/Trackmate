# TrackMate - Költségkövető Alkalmazás

## Technikai Dokumentáció

---

## 1. Áttekintés

A TrackMate egy költségkövető webalkalmazás, amely segít a felhasználóknak nyomon követni havi bevételeiket és kiadásaikat. Az alkalmazás készült **Angular** keretrendszerrel, **TypeScript** nyelven, és **localStorage** alapú adattárolást használ.

**Elérhető:** https://trackmate-seven.vercel.app

---

## 2. Rendszer Architektúra

### 2.1 Kliens oldal (Frontend)

| Komponens | Fájl | Leírás |
|-----------|------|--------|
| **LoginComponent** | `src/app/login/login.ts` | Bejelentkezés, regisztráció, beállítások |
| **CalendarCalculatorComponent** | `src/app/calendar-calculator/calendar-calculator.ts` | Naptár, költések, diagramok |
| **BudgetService** | `src/app/services/budget.service.ts` | Üzleti logika, adattárolás |
| **ThemeService** | `src/app/services/theme.service.ts` | Témakezelés |

### 2.2 Adattárolás

Az alkalmazás **localStorage**-ban tárolja az adatokat:

```
localStorage:
├── budget_app_user        # Bejelentkezett felhasználó ID
├── budget_app_users       # Összes felhasználó adata
└── budget_app_data        # Backup adat
```

---

## 3. Adatmodellek (TypeScript Interfészek)

```
typescript
// Fix levonások (albérlet, számlák)
interface FixedDeduction {
    name: string;
    amount: number;
}

// Értesítések (fizetendő dolgok)
interface Notification {
    name: string;
    amount: number;
    day: number;           // Hányadik nap
    recurring: boolean;   // Ismétlődő-e
}

// Egy költés
interface Expense {
    date: string;          // "YYYY-MM-DD"
    amount: number;
    description: string;
}

// Felhasználó adatai
interface UserData {
    email?: string;
    salary: number;               // Havi fizetés
    fixedDeductions: FixedDeduction[];
    notifications: Notification[];
    expenses: Expense[];
}
```

---

## 4. CRUD Műveletek

### 4.1 Create (Létrehozás)

| Művelet | Metódus | Leírás |
|---------|---------|--------|
| Regisztráció | `register(username, password, email)` | Új felhasználó létrehozása |
| Költség hozzáadása | `addExpense(expense)` | Új költés rögzítése |
| Fix levonás | `addFixedDeduction(deduction)` | Új fix költség |
| Értesítés | `addNotification(notification)` | Új fizetési emlékeztető |

### 4.2 Read (Olvasás)

| Művelet | Metódus | Leírás |
|---------|---------|--------|
| Bejelentkezés | `login(username, password)` | Felhasználó azonosítása |
| Adatok betöltése | `loadUserData()` | Felhasználó adatainak betöltése |
| Költségek napra | `getExpensesForDay(day)` | Adott nap költései |
| Kategória összesen | `getCategoryTotals()` | Kategóriánkénti összesítés |
| Napi keret | `getDailyBudget()` | Maradék napi költési keret |

### 4.3 Update (Frissítés)

| Művelet | Metódus | Leírás |
|---------|---------|--------|
| Fizetés módosítása | `updateSalary(salary)` | Havi fizetés beállítása |
| Téma váltás | `setTheme(index)` | Vizuális téma megváltoztatása |

### 4.4 Delete (Törlés)

| Művelet | Metódus | Leírás |
|---------|---------|--------|
| Költség törlése | `splice(index)` | Költség eltávolítása |
| Levonás törlése | `removeFixedDeduction(index)` | Fix költség törlése |
| Értesítés törlése | `removeNotification(index)` | Emlékeztető törlése |
| Kijelentkezés | `logout()` | Minden adat törlése |

---

## 5. Backend API (Opcionális - localhost)

A projekt tartalmaz egy opcionális **Express/Node.js** backendet is (`server/index.js`), amely REST API-ként működhet.

### API Végpontok:

| Metódus | Endpoint | Leírás |
|---------|----------|--------|
| POST | `/api/register` | Új felhasználó regisztrálása |
| POST | `/api/login` | Bejelentkezés |
| GET | `/api/user/:id` | Felhasználó adatainak lekérése |
| POST | `/api/user/:id` | Felhasználó adatainak mentése |
| POST | `/api/user/:id/expense` | Költség hozzáadása |

---

## 6. Kliens Oldali Komponensek

### 6.1 LoginComponent (`src/app/login/login.ts`)

**Funkciók:**
- Bejelentkezés / Regisztráció
- Felhasználói beállítások (fizetés, fix költségek, értesítések)
- Téma választó
- Kijelentkezés

**Példa használat:**
```
typescript
// Bejelentkezés
this.budgetService.login('user1', 'password123').subscribe();

// Regisztráció
this.budgetService.register('user1', 'password123', 'email@test.com').subscribe();

// Kijelentkezés
this.budgetService.logout();
```

### 6.2 CalendarCalculatorComponent (`src/app/calendar-calculator/calendar-calculator.ts`)

**Funkciók:**
- Naptár megjelenítés (hétfővel kezdődik)
- Költségek hozzáadása/törlése
- Kördiagram kategóriánként
- Statisztikák (top 5 költés, kategória százalékok)
- Mai fizetendők kiemelése

**Kategóriák:**
```
typescript
const EXPENSE_CATEGORIES = [
    { name: 'Étel', icon: '🍔', color: '#f97316' },
    { name: 'Bolt', icon: '🛒', color: '#22c55e' },
    { name: 'Cigi', icon: '🚬', color: '#ef4444' },
    { name: 'Szórakozás', icon: '🎮', color: '#8b5cf6' },
    { name: 'Kávé', icon: '☕', color: '#d97706' },
    { name: 'Utazás', icon: '🚌', color: '#06b6d4' },
    { name: 'Ruházat', icon: '👕', color: '#ec4899' },
    { name: 'Egészség', icon: '💊', color: '#14b8a6' },
    { name: 'Számlák', icon: '📄', color: '#64748b' },
    { name: 'Egyéb', icon: '📦', color: '#94a3b8' }
];
```

---

## 7. Tiszta Kód Elvei

### 7.1 Alkalmazott elvek:

1. **Single Responsibility Principle (SRP)**
   - Minden komponens egy felelősségi körrel rendelkezik
   - `BudgetService` csak az üzleti logikáért felelős
   - Komponensek csak a megjelenítésért felelősek

2. **Dependency Injection**
   - Angular dependency injection használata
   - Szolgáltatások `providedIn: 'root'`
   - Komponensekben `inject()` függvény

3. **Signal használata**
   - Angular Signals a reaktív állapotkezeléshez
   - `userData = signal<UserData>(...)`

4. **Interface-ek használata**
   - Típusos adatmodellek
   - Jól dokumentált struktúra

5. **Separation of Concerns**
   - Logika (service) elkülönítve a megjelenítéstől (component)
   - Stílusok külön CSS fájlokban

---

## 8. Mobil és Asztali Támogatás

### 8.1 Reszponzív design:
- **Mobile first** megközelítés
- Flexbox és Grid layout
- Media queries különböző méretekhez

### 8.2 Méret cutoff-ok:
```
css
/* Mobile */
@media (max-width: 480px) { ... }

/* Tablet */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }
```

### 8.3 Adaptív funkciók:
- Érintésbarát gombok (min. 44px)
- Nagy betűméretek mobileszközökre
- Átlátszó háttér és现代化 dizájn

---

## 9. Telepítés és Futtatás

### 9.1 Lokális fejlesztés:

```
bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm start
# -> http://localhost:4200

# Backend (opcionális)
cd server
npm start
# -> http://localhost:3000
```

### 9.2 Build és Deploy:

```
bash
# Production build
npm run build

# Vercel deploy
npx vercel --prod
```

---

## 10. Összefoglalás

| Jellemző | Megvalósítás |
|----------|---------------|
| **Framework** | Angular 21+ |
| **Nyelv** | TypeScript |
| **Adattárolás** | localStorage / REST API |
| **CRUD** | Teljes körű |
| **Design** | Modern, reszponzív |
| **Támogatás** | Mobile + Desktop |
| **Tiszta kód** | SOLID elvek, TypeScript interface-ek |

---

**Verzió:** 1.0.0  
**Utolsó frissítés:** 2026.02.24  
**Szerző:** Adam Zsitnyák
