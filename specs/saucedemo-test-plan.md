# SauceDemo Core Workflow Test Plan

## Application Overview

SauceDemo (Swag Labs) commerce application. Reconnaissance was limited to https://www.saucedemo.com/ and its one-level-deep application pages. Main pages: login (/), inventory (/inventory.html), product detail (/inventory-item.html?id=4), cart (/cart.html), checkout information (/checkout-step-one.html), checkout overview (/checkout-step-two.html), and checkout completion (/checkout-complete.html). Authenticated navigation is a side menu containing All Items, About (external saucelabs.com), Logout, and Reset App State. Inventory exposes six products, Add to cart controls, a cart link, and a sort dropdown with four options. Search and CRUD controls are not present in the UI. Assume each test starts from a fresh browser context and uses documented credentials where needed.

## Test Scenarios

### 1. SauceDemo core workflows

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with valid credentials

**File:** `tests/saucedemo-login-success.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/.
    - expect: The Swag Labs login page is displayed with Username, Password, and Login controls.
  2. Enter `standard_user` in Username and `secret_sauce` in Password.
    - expect: The entered values are accepted.
  3. Select Login.
    - expect: The user is authenticated and navigated to `/inventory.html`.
    - expect: The Products page and product inventory are displayed.

#### 1.2. Login validation and locked-user handling

**File:** `tests/saucedemo-login-validation.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ and select Login with both fields empty.
    - expect: The login page remains visible.
    - expect: A required-field validation error is displayed.
  2. Enter an invalid username and password, then select Login.
    - expect: Authentication fails and an error message is displayed.
    - expect: The user is not navigated to the inventory page.
  3. Enter the documented `locked_out_user` and `secret_sauce`, then select Login.
    - expect: Authentication is refused with a locked-user error.
    - expect: The user remains on the login page.

#### 1.3. Primary navigation and product detail navigation

**File:** `tests/saucedemo-primary-navigation.spec.ts`

**Steps:**
  1. Log in as `standard_user` with password `secret_sauce`.
    - expect: The inventory page is displayed.
  2. Open the side menu.
    - expect: All Items, About, Logout, and Reset App State are visible.
  3. Select a product name such as Sauce Labs Backpack.
    - expect: The product detail page opens and shows the product name, description, price, Add to cart, and Back to products controls.
  4. Select Back to products, then use the sort dropdown to select Name (Z to A), Price (low to high), and Price (high to low).
    - expect: The user returns to inventory.
    - expect: Products are reordered according to each selected sort option.
  5. Open the side menu and select All Items.
    - expect: The inventory page is displayed with the complete product list.
  6. Open the side menu and select About.
    - expect: The application navigates to the external Sauce Labs site at `saucelabs.com`.

#### 1.4. Checkout form submission and successful order

**File:** `tests/saucedemo-checkout.spec.ts`

**Steps:**
  1. Log in as `standard_user`, add Sauce Labs Backpack to the cart, and open the cart.
    - expect: The cart page shows the selected item with quantity, price, Remove, Continue Shopping, and Checkout controls.
  2. Select Checkout without entering customer information.
    - expect: The checkout information page remains visible.
    - expect: A validation error states `Error: First Name is required`.
  3. Enter `Ada` in First Name, `Lovelace` in Last Name, and `12345` in Zip/Postal Code, then select Continue.
    - expect: The checkout overview page is displayed.
    - expect: The item, payment information, shipping information, item total, tax, and total are shown.
  4. Select Finish.
    - expect: The checkout completion page is displayed with `Thank you for your order!`.
    - expect: Back Home and Generate PDF order controls are available.

#### 1.5. Cart item removal

**File:** `tests/saucedemo-cart-removal.spec.ts`

**Steps:**
  1. Log in as `standard_user`, add Sauce Labs Backpack to the cart, and open the cart.
    - expect: The cart contains one item and shows the cart count as 1.
  2. Select Remove for the item.
    - expect: The item is removed from the cart.
    - expect: The cart is empty and the cart count is cleared or no longer shows 1.
  3. Select Continue Shopping.
    - expect: The inventory page is displayed.

#### 1.6. Search functionality unavailable

**File:** `tests/saucedemo-search-not-found.spec.ts`

**Steps:**
  1. Inspect the login, inventory, product detail, cart, and checkout pages for a search input, search button, or search navigation item.
    - expect: Feature not found on UI.
    - expect: No search test steps are generated because the application provides no visible search functionality.

#### 1.7. CRUD operations unavailable

**File:** `tests/saucedemo-crud-not-found.spec.ts`

**Steps:**
  1. Inspect the authenticated inventory, product detail, cart, and checkout pages for controls to add, edit, or delete application records.
    - expect: Feature not found on UI for CRUD operations.
    - expect: The UI supports adding/removing cart items and completing orders, but it does not expose Add/Edit/Delete record-management operations; no CRUD test steps are generated.

#### 1.8. Logout

**File:** `tests/saucedemo-logout.spec.ts`

**Steps:**
  1. Log in as `standard_user` with password `secret_sauce`.
    - expect: The authenticated inventory page is displayed.
  2. Open the side menu and select Logout.
    - expect: The session ends and the user is returned to the login page.
  3. Attempt to navigate directly to `/inventory.html`.
    - expect: The protected inventory page is not accessible as an authenticated user.
    - expect: The user is redirected to the login page or shown the unauthenticated login state.
