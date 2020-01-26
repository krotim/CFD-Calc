# CFD Calc

In the project directory, you can run:

### `npm install` > `npm start`

## Description

**CFD calc is simple web app that helps you decide in which CFD you should invest based on few key things**

\*\*1. Investment

2. Direction
3. Leverage
4. Entry Price
5. Exit Price\*\*

### Formula for Long direction

`(ExitPrice - EntryPrice) * Investment * Leverage)) / EntryPrice;`

### Formula for Short direction

`(EntryPrice - ExitPrice) * Investment * Leverage)) / EntryPrice;`

### Advantages of being a registered user

If you plan on using the web app you should consider singing up, and here is why

**_1. Symbols_**

Investors mostly have few cfds/stocks in which they invest, so that is why if you are user you have an option to save 5 cfds/stocks symbols so when you land on main page you can use them as call to retrieve current cfd/stock price.

**_2. News_**

By searching for some cfd/stock company like "APPLE" in your search input you will get latest news that can affect cfd/stock price.

**_3. Calculate profit/loss after state and city taxes - coming in version 1.1_**

You'll be able to enter your profit/loss, state tax and city tax

**Things to Do for v1 Release (31.01.2020.)**

-   [ ] Populate symbols from user data base
-   [ ] Get CFD/Stock current price based on selected symbol
-   [ ] Get news from API

**Team members and Language**
Kristijan Rotim
_(React.JS + Firebase)_
