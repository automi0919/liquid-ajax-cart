---
title: State
layout: page
---

# State
State is a Javascript object where Liquid Ajax Cart keeps the information related to user’s cart.

{% include code/state.html %}

State gets updated after each Shopify [Cart API request](/v1/reference/requests/).

Always use the functions from the [Cart Ajax API requests](/v1/reference/requests/) reference instead of direct Cart API calls and Liquid Ajax Cart will make sure that the State is up to date.

## Properties

##### `cart`
Contains JSON versions of the Shopify [`cart`](https://shopify.dev/api/liquid/objects/cart) liquid object. 

The property data is getting loaded from the [`data-ajax-cart-initial-state`](/v1/reference/data-ajax-cart-initial-state/) script.

The property gets updated after each successful Shopify [Cart API request](/v1/reference/requests/).

##### `previousCart`

Contains a JSON object that was in the `cart` property before the `cart` was updated due to the last successful Shopify [Cart API request](/v1/reference/requests/).

The `cart` and the `previousCart` properties are not always different. If the previous Shopify [Cart API request](/v1/reference/requests/) didn't make any changes in the cart but returned Shopify cart JSON-data, for example a ["Get" request](/v1/reference/cartRequestGet/) or an empty ["Update" request](/v1/reference/cartRequestUpdate/), the `cart` and the `previousCart` will be 100% same.

##### `status.cartStateSet`

The `status.cartStateSet` is `true` if the `cart` property is loaded. 

The [`js-ajax-cart-set`](/v1/reference/js-ajax-cart-set/) CSS class will be added to the `body` tag if the property is `true`.

##### `status.requestInProgress`

The `status.requestInProgress` is `true` if there are one or more Shopify [Cart API requests](/v1/reference/requests/) in [Queues](/v1/reference/queues/).

If the property is `true`:
  * some [controls](/v1/reference/controls/) become inactive,
  * the [`js-ajax-cart-request-in-progress`](/v1/reference/js-ajax-cart-request-in-progress/) CSS class will be added to the `body` tag.

## Interaction

Use the [`getCartState`](/v1/reference/getCartState/) function to get the current state.

If you want to run your Javascript code each time when the state is get updated — use the [`subscribeToCartStateUpdate`](/v1/reference/subscribeToCartStateUpdate/) function.
