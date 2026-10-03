(() => {
  "use strict";

  const APP = {
    name: "bit Trade net",

    user: {
      name: "Joshua Bergin",
      email: "Berginjoshua1@gmail.com",
      accountId: "BTN-882104-X"
    },

    /*
      Front-end prototype credentials only.
      Do not use this pattern for real authentication.
    */
    demoCredential: {
      email: "Berginjoshua1@gmail.com",
      password: "Thatguy12@"
    },

    balances: {
      total: 111009.79,
      liquid: 47986.00,
      profit: 72509.79,
      hashrate: 450
    },

    simulatedClearance: 5960.00
  };


  /* =========================================================
     TRANSACTION DATA
  ========================================================= */

  const txns = [
    [
      "2022-11-18",
      "Yield Distribution",
      "+ $18,240.00",
      "Completed"
    ],

    [
      "2022-07-03",
      "Rolled Over Reinvestment",
      "+ $21,800.00",
      "Rolled Over"
    ],

    [
      "2021-12-14",
      "Yield Distribution",
      "+ $12,460.00",
      "Completed"
    ],

    [
      "2021-04-22",
      "Rolled Over Reinvestment",
      "+ $16,250.00",
      "Rolled Over"
    ],

    [
      "2020-09-08",
      "Yield Distribution",
      "+ $9,760.00",
      "Completed"
    ],

    [
      "2019-03-16",
      "Initial Seed Deposit",
      "+ $18,500.00",
      "Completed"
    ]
  ];


  /* =========================================================
     HELPERS
  ========================================================= */

  const $ = (selector, root = document) =>
    root.querySelector(selector);


  const esc = (value) =>
    String(value).replace(
      /[&<>"']/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[character])
    );


  const money = number =>
    "$" +
    Number(number).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );


  const isAuthed = () =>
    sessionStorage.getItem("btn_session") === "1" ||
    localStorage.getItem("btn_remember") === "1";


  /* =========================================================
     SVG LOGO
  ========================================================= */

  function logo(size = 46) {

    return `
      <svg
        class="logo"
        width="${size}"
        height="${size}"
        viewBox="0 0 64 64"
        aria-label="BTN logo"
      >

        <defs>

          <linearGradient
            id="r"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >

            <stop stop-color="#ef4444"/>

            <stop
              offset=".52"
              stop-color="#f8fafc"
            />

            <stop
              offset="1"
              stop-color="#2563eb"
            />

          </linearGradient>

        </defs>


        <path
          d="M32 4 56 18v28L32 60 8 46V18z"
          fill="#0b1220"
          stroke="#38bdf8"
          stroke-width="1.5"
        />


        <path
          d="M32 9 49 19v9L32 38 15 28v-9z"
          fill="url(#r)"
        />


        <path
          d="M32 38v17L49 45V28z"
          fill="#2563eb"
          opacity=".95"
        />


        <path
          d="M32 38 15 28v17l17 10z"
          fill="#ef4444"
          opacity=".9"
        />


        <text
          x="32"
          y="34"
          text-anchor="middle"
          font-size="8"
          font-weight="900"
          fill="#07111e"
        >
          BTN
        </text>

      </svg>
    `;
  }


  /* =========================================================
     TOP MARKET TICKER
  ========================================================= */

  function topbar() {

    return `
      <div class="topbar">

        <div class="ticker">

          <span>
            BTC/USD
            <b class="up">
              $67,842.31 ▲ 1.82%
            </b>
          </span>


          <span>
            ETH/USD
            <b class="up">
              $2,614.08 ▲ 0.74%
            </b>
          </span>


          <span>
            BTN Mining Pool Hashrate
            <b>
              842 TH/s
            </b>
          </span>


          <span>
            Network Clearance Status
            <b class="up">
              SETTLED
            </b>
          </span>


          <span>
            System Integrity
            <b class="up">
              NOMINAL
            </b>
          </span>

        </div>

      </div>
    `;
  }


  /* =========================================================
     NAVIGATION
  ========================================================= */

  function nav() {

    return `
      <nav class="nav">

        <a
          class="brand"
          href="#dashboard"
        >

          ${logo()}

          <span>
            bit Trade net

            <small>
              Institutional Client Portal
            </small>

          </span>

        </a>


        <div class="nav-actions">

          <a
            class="nav-btn"
            href="#dashboard"
          >
            Dashboard
          </a>


          <a
            class="nav-btn"
            href="#withdraw"
          >
            Withdraw
          </a>


          <button
            class="nav-btn"
            id="logoutBtn"
          >
            Log Out
          </button>

        </div>

      </nav>
    `;
  }


  /* =========================================================
     SHELL
  ========================================================= */

  function shell(content) {

    return `
      ${topbar()}

      <div class="shell">

        ${nav()}

        ${content}


        <div class="footer">

          © 2026 bit Trade net interface

          • No real transaction or custody service
          is provided by this static client.

        </div>

      </div>
    `;
  }


  /* =========================================================
     LOGIN PAGE
  ========================================================= */

  function login() {

    return `
      ${topbar()}

      <main class="login-page">

        <section class="card login-card">

          <div class="login-logo">

            ${logo(64)}

          </div>


          <div class="login-head">

            <div class="eyebrow">
              Secure Client Access
            </div>


            <h1>
              Welcome back
            </h1>


            <p class="muted">
              Sign in to access your institutional portal.
            </p>

          </div>


          <form
            id="loginForm"
            class="form-grid"
            novalidate
          >

            <div class="field">

              <label for="email">
                Email address
              </label>


              <input
                id="email"
                type="email"
                autocomplete="username"
                placeholder="you@example.com"
                required
              >

            </div>


            <div class="field">

              <label for="password">
                Password
              </label>


              <div class="password-wrap">

                <input
                  id="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="••••••••"
                  required
                >


                <button
                  type="button"
                  class="toggle"
                  id="togglePw"
                >
                  Show
                </button>

              </div>

            </div>


            <label class="remember">

              <input
                id="remember"
                type="checkbox"
              >

              Remember this device

            </label>


            <div
              id="loginStatus"
              class="login-status"
            ></div>


            <button
              class="btn full"
              type="submit"
              id="loginBtn"
            >
              Sign In Securely
            </button>

          </form>


          <div class="hint">

            Prototype access:

            <b>
              ${esc(APP.demoCredential.email)}
            </b>

            /

            <b>
              ${esc(APP.demoCredential.password)}
            </b>

          </div>

        </section>

      </main>
    `;
  }


  /* =========================================================
     DASHBOARD
  ========================================================= */

  function dashboard() {

    const rows = txns
      .map(transaction => {

        return `
          <tr>

            <td>
              ${transaction[0]}
            </td>


            <td>
              ${esc(transaction[1])}
            </td>


            <td>
              ${transaction[2]}
            </td>


            <td>

              <span
                class="badge ${
                  transaction[3] === "Completed"
                    ? "ok"
                    : "warn"
                }"
              >
                ${transaction[3]}
              </span>

            </td>

          </tr>
        `;

      })
      .join("");


    return shell(`

      <main class="container">

        <div class="page-head">

          <div>

            <div class="eyebrow">
              Client Overview
            </div>


            <h1>
              Portfolio Dashboard
            </h1>

          </div>


          <div
            class="muted"
            id="clock"
          ></div>

        </div>


        <section class="card profile">

          <div class="avatar">
            JB
          </div>


          <div>

            <strong>

              ${APP.user.name}

              <span class="badge ok">
                ✓ Verified Tier-3 KYC
              </span>

            </strong>


            <span>
              Account ID:
              ${APP.user.accountId}
            </span>

          </div>

        </section>


        <div
          class="grid metrics"
          style="margin-top:14px"
        >


          <div class="card">

            <div class="metric-label">
              Total Portfolio Valuation
            </div>


            <div class="metric">
              ${money(APP.balances.total)}
            </div>


            <div class="metric-sub cyan">
              USD consolidated valuation
            </div>

          </div>


          <div class="card">

            <div class="metric-label">
              Available Liquid Balance
            </div>


            <div class="metric">
              ${money(APP.balances.liquid)}
            </div>


            <div class="metric-sub green">
              Available for withdrawal
            </div>

          </div>


          <div class="card">

            <div class="metric-label">
              Cumulative Mining Profit
            </div>


            <div class="metric green">
              +${money(APP.balances.profit).slice(1)}
            </div>


            <div class="metric-sub green">
              +188.3% cumulative change
            </div>

          </div>


          <div class="card">

            <div class="metric-label">
              Allocated Hashrate
            </div>


            <div class="metric">
              ${APP.balances.hashrate} TH/s
            </div>


            <div class="metric-sub cyan">
              Tier-4 Enterprise ASIC Cluster
            </div>

          </div>

        </div>


        <div class="section-title">

          <h2>
            Historical Investment & Payout Ledger
          </h2>


          <span class="badge">
            2019–2022
          </span>

        </div>


        <section class="card table-wrap">

          <table class="table">

            <thead>

              <tr>

                <th>
                  Date
                </th>

                <th>
                  Action
                </th>

                <th>
                  Gross Amount
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>


            <tbody>
              ${rows}
            </tbody>

          </table>

        </section>

      </main>

    `);
  }


  /* =========================================================
     WITHDRAWAL PAGE
  ========================================================= */

  function withdraw() {

    return shell(`

      <main class="container">

        <div class="page-head">

          <div>

            <div class="eyebrow">
              Capital Operations
            </div>


            <h1>
              Withdrawal Request
            </h1>


            <p class="muted">
              Prepare a simulated payout request
              for the available balance.
            </p>

          </div>

        </div>


        <div class="grid two">


          <section class="card">

            <div
              class="section-title"
              style="margin-top:0"
            >

              <h2>
                Destination & Amount
              </h2>


              <span class="badge ok">

                Balance
                ${money(APP.balances.liquid)}

              </span>

            </div>


            <form
              id="withdrawForm"
              class="form-grid"
              novalidate
            >


              <div class="field">

                <label for="network">
                  Payout network
                </label>


                <select id="network">

                  <option value="BTC">
                    Bitcoin (BTC)
                  </option>

                  <option value="USDT">
                    USDT TRC20
                  </option>

                  <option value="ETH">
                    Ethereum ERC20
                  </option>

                </select>

              </div>


              <div class="field">

                <label for="wallet">
                  Destination wallet address
                </label>


                <div class="input-row">

                  <input
                    id="wallet"
                    class="grow"
                    placeholder="Enter destination address"
                    autocomplete="off"
                  >


                  <button
                    type="button"
                    class="btn secondary"
                    id="pasteBtn"
                  >
                    Paste
                  </button>

                </div>

              </div>


              <div class="field">

                <label for="amount">
                  Withdrawal amount (USD)
                </label>


                <div class="input-row">

                  <input
                    id="amount"
                    class="grow"
                    type="number"
                    min="1"
                    max="${APP.balances.liquid}"
                    step="0.01"
                    value="${APP.balances.liquid}"
                  >


                  <button
                    type="button"
                    class="btn secondary"
                    id="maxBtn"
                  >
                    MAX
                  </button>

                </div>

              </div>


              <div class="breakdown">

                <div class="row">

                  <span>
                    Net Requested Amount
                  </span>


                  <strong id="netAmount">
                    ${money(APP.balances.liquid)}
                  </strong>

                </div>


                <div class="row">

                  <span>
                    Estimated Network Fee
                  </span>


                  <strong id="gasFee">
                    ${money(18.50)}
                  </strong>

                </div>


                <div class="row total">

                  <span>
                    Total Disbursement
                  </span>


                  <strong id="totalAmount">
                    ${money(APP.balances.liquid + 18.5)}
                  </strong>

                </div>

              </div>


              <button
                class="btn green full"
                type="submit"
              >
                Authorize Withdrawal Release
              </button>

            </form>

          </section>


          <aside class="card">

            <div class="eyebrow">
              Clearance Protocol
            </div>


            <h2 style="margin:8px 0">
              Pre-release verification
            </h2>


            <p
              class="muted"
              style="font-size:12px;line-height:1.65"
            >

              This public interface does not collect
              cryptocurrency, process payments, or provide
              a real escrow deposit address.

              The authorization step below is a UI
              simulation only.

            </p>


            <div class="notice">

              <strong>
                Security notice:
              </strong>

              A legitimate wallet transfer should not
              require you to send a separate
              “clearance fee” to unlock your own funds.

              Do not send funds to an address supplied
              by this prototype.

            </div>

          </aside>

        </div>

      </main>

    `);
  }


  /* =========================================================
     WITHDRAWAL MODAL
  ========================================================= */

  function modal() {

    return `

      <div
        class="modal-backdrop"
        id="modalBackdrop"
      >

        <section class="modal">


          <div class="modal-head">

            <div>

              <div class="eyebrow">
                Withdrawal Authorization
              </div>


              <h2>
                Verification checkpoint
              </h2>

            </div>


            <button
              class="close"
              id="closeModal"
              aria-label="Close"
            >
              ×
            </button>

          </div>


          <p
            class="muted"
            style="font-size:12px;line-height:1.65"
          >

            The requested withdrawal has reached a
            simulated clearance checkpoint.

            No payment is required here because this
            is a front-end prototype.

          </p>


          <div class="protocol">


            <div class="row">

              <span>
                Requested release
              </span>


              <strong id="modalAmount">
                ${money(APP.balances.liquid)}
              </strong>

            </div>


            <div class="row">

              <span>
                Simulated clearance reference
              </span>


              <strong class="amber">
                BTN-SIM-5960
              </strong>

            </div>


            <div class="row">

              <span>
                Verification window
              </span>


              <strong
                class="timer"
                id="timer"
              >
                02:00
              </strong>

            </div>


            <div
              class="qr"
              aria-label="Non-functional simulation QR graphic"
            ></div>


            <div class="sim-address">

              <code>
                SIMULATION-ONLY-NO-DEPOSIT-ADDRESS
              </code>


              <button
                class="btn secondary"
                id="copySim"
              >
                Copy
              </button>

            </div>

          </div>


          <div class="notice">

            <strong>
              No real escrow:
            </strong>

            The displayed reference and QR graphic
            cannot receive cryptocurrency.

            Never use them as a payment destination.

          </div>


          <div
            style="display:flex;gap:9px;margin-top:16px"
          >

            <button
              class="btn green"
              id="confirmSim"
            >
              Confirm Simulation
            </button>


            <button
              class="btn secondary"
              id="cancelSim"
            >
              Cancel
            </button>

          </div>

        </section>

      </div>

    `;
  }


  /* =========================================================
     TOAST
  ========================================================= */

  function toast(message) {

    const old = $(".toast");

    if (old) {
      old.remove();
    }


    const toastElement =
      document.createElement("div");

    toastElement.className = "toast";

    toastElement.textContent = message;

    document.body.appendChild(toastElement);


    setTimeout(() => {
      toastElement.remove();
    }, 2800);
  }


  /* =========================================================
     ROUTER
  ========================================================= */

  function route() {

    let hash =
      location.hash || "#login";


    if (hash === "#login") {

      render(login());

      bindLogin();

      return;
    }


    if (!isAuthed()) {

      location.hash = "#login";

      return;
    }


    if (hash === "#withdraw") {

      render(withdraw());

      bindWithdraw();

      return;
    }


    render(dashboard());

    bindDashboard();
  }


  /* =========================================================
     RENDER
  ========================================================= */

  function render(html) {

    document.getElementById("app").innerHTML =
      html;

    bindLogout();
  }


  /* =========================================================
     LOGOUT
  ========================================================= */

  function bindLogout() {

    const button =
      $("#logoutBtn");


    if (!button) {
      return;
    }


    button.onclick = () => {

      sessionStorage.removeItem(
        "btn_session"
      );

      localStorage.removeItem(
        "btn_remember"
      );


      location.hash = "#login";


      toast("Session revoked.");
    };
  }


  /* =========================================================
     LOGIN
  ========================================================= */

  function bindLogin() {

    $("#togglePw").onclick = () => {

      const password =
        $("#password");


      password.type =
        password.type === "password"
          ? "text"
          : "password";


      $("#togglePw").textContent =
        password.type === "password"
          ? "Show"
          : "Hide";
    };


    $("#loginForm").onsubmit =
      async event => {

        event.preventDefault();


        const email =
          $("#email").value.trim();


        const password =
          $("#password").value;


        const status =
          $("#loginStatus");


        const button =
          $("#loginBtn");


        if (
          email !== APP.demoCredential.email ||
          password !== APP.demoCredential.password
        ) {

          status.textContent =
            "Invalid credentials.";

          status.style.color =
            "var(--red)";

          return;
        }


        button.disabled = true;


        const steps = [

          "Verifying cryptographic signature...",

          "Decrypting account vault...",

          "Loading portfolio balances..."

        ];


        for (const step of steps) {

          status.innerHTML = `

            ${step}

            <div class="loader">
              <i></i>
            </div>

          `;


          await new Promise(
            resolve =>
              setTimeout(resolve, 650)
          );
        }


        if ($("#remember").checked) {

          localStorage.setItem(
            "btn_remember",
            "1"
          );

        } else {

          sessionStorage.setItem(
            "btn_session",
            "1"
          );

        }


        status.textContent =
          "Access granted.";

        status.className =
          "login-status done";


        setTimeout(() => {

          location.hash =
            "#dashboard";

        }, 350);
      };
  }


  /* =========================================================
     WALLET VALIDATION
  ========================================================= */

  function validAddress(
    network,
    address
  ) {

    if (!address) {
      return false;
    }


    if (network === "BTC") {

      return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,87}$/
        .test(address);
    }


    if (network === "USDT") {

      return /^T[1-9A-HJ-NP-Za-km-z]{33}$/
        .test(address);
    }


    return /^0x[a-fA-F0-9]{40}$/
      .test(address);
  }


  /* =========================================================
     WITHDRAWAL FORM
  ========================================================= */

  function bindWithdraw() {

    const amount =
      $("#amount");


    const update = () => {

      let number =
        Math.max(
          0,
          Math.min(
            APP.balances.liquid,
            Number(amount.value) || 0
          )
        );


      amount.value =
        number;


      $("#netAmount").textContent =
        money(number);


      $("#gasFee").textContent =
        money(number ? 18.5 : 0);


      $("#totalAmount").textContent =
        money(
          number +
          (number ? 18.5 : 0)
        );
    };


    amount.oninput =
      update;


    $("#maxBtn").onclick =
      () => {

        amount.value =
          APP.balances.liquid;

        update();
      };


    $("#pasteBtn").onclick =
      async () => {

        try {

          const value =
            await navigator.clipboard.readText();


          $("#wallet").value =
            value;


          toast(
            "Wallet address pasted."
          );

        } catch {

          toast(
            "Clipboard access was unavailable."
          );
        }
      };


    $("#withdrawForm").onsubmit =
      event => {

        event.preventDefault();


        const network =
          $("#network").value;


        const address =
          $("#wallet").value.trim();


        const number =
          Number(amount.value);


        if (
          !validAddress(
            network,
            address
          )
        ) {

          toast(
            "Enter a valid wallet address for the selected network."
          );

          return;
        }


        if (
          !number ||
          number > APP.balances.liquid
        ) {

          toast(
            "Enter an amount within the available balance."
          );

          return;
        }


        document.body.insertAdjacentHTML(
          "beforeend",
          modal()
        );


        bindModal(number);
      };
  }


  /* =========================================================
     MODAL CONTROLS
  ========================================================= */

  function bindModal(number) {

    let seconds = 120;


    const timer =
      $("#timer");


    const interval =
      setInterval(() => {

        seconds--;


        timer.textContent =
          `${String(
            Math.floor(seconds / 60)
          ).padStart(2, "0")}:${String(
            seconds % 60
          ).padStart(2, "0")}`;


        if (seconds <= 0) {

          clearInterval(interval);

          timer.textContent =
            "EXPIRED";
        }

      }, 1000);


    const close = () => {

      clearInterval(interval);

      $("#modalBackdrop")?.remove();
    };


    $("#closeModal").onclick =
      close;


    $("#cancelSim").onclick =
      close;


    $("#copySim").onclick =
      async () => {

        try {

          await navigator.clipboard.writeText(
            "SIMULATION-ONLY-NO-DEPOSIT-ADDRESS"
          );


          toast(
            "Simulation reference copied."
          );

        } catch {

          toast(
            "Copy unavailable."
          );
        }
      };


    $("#confirmSim").onclick =
      () => {

        close();


        toast(
          `Simulation confirmed for ${money(
            number
          )}. No funds were transferred.`
        );
      };
  }


  /* =========================================================
     DASHBOARD CLOCK
  ========================================================= */

  function bindDashboard() {

    const clock =
      $("#clock");


    const tick = () => {

      clock.textContent =
        new Date().toLocaleString(
          [],
          {
            dateStyle: "medium",
            timeStyle: "medium"
          }
        );
    };


    tick();


    setInterval(
      tick,
      1000
    );
  }


  /* =========================================================
     START APPLICATION
  ========================================================= */

  window.addEventListener(
    "hashchange",
    route
  );


  route();

})();
