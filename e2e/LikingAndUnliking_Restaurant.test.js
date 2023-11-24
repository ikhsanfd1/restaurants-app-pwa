const assert = require('assert');

Feature('Liking and Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked explore restaurant', ({ I }) => {
  I.seeElement('.cards');
  I.see('Belum ada Restaurant yang difavorite kan', '.card-not-found');

  I.saveScreenshot('empty_liked.png');
});

Scenario('liking a restaurant', async ({ I }) => {
  I.see('Belum ada Restaurant yang difavorite kan', '.card-not-found');

  I.amOnPage('/');

  I.seeElement('.card');

  // Menunggu hingga elemen '.card-body a' muncul sebelum mengambil atribut
  const firstRestoLike = locate('.card-body a').first();
  await I.waitForElement(firstRestoLike);
  const firstRestoIdLike = await I.grabAttributeFrom(firstRestoLike, 'data-record-id');
  I.click(firstRestoLike);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.saveScreenshot('liking_one_restaurant.png');

  I.seeElement('.close-icon');
  I.click('.close-icon');

  I.amOnPage('/#/favorite');

  // Menunggu hingga elemen '.card' muncul sebelum mengambil atribut
  await I.waitForElement('.card');
  const likedRestoId = await I.grabAttributeFrom('.card-body a', 'data-record-id');

  I.saveScreenshot('ensuring_that_preferred_restaurants_appear.png');

  assert.strictEqual(firstRestoIdLike, likedRestoId);
});

Scenario('unliking restaurant', async ({ I }) => {
  I.see('Belum ada Restaurant yang difavorite kan', '.card-not-found');

  I.amOnPage('/');

  I.seeElement('.card');

  const firstRestoLike = locate('.card-body a').first();
  const firstRestoIdLike = await I.grabAttributeFrom(firstRestoLike, 'data-record-id');
  I.click(firstRestoLike);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.seeElement('.close-icon');
  I.click('.close-icon');

  I.amOnPage('/#/favorite');

  I.seeElement('.card');
  const firstRestoUnlike = locate('.card-body a').first();
  const unlikeRestoId = await I.grabAttributeFrom('.card-body a', 'data-record-id');
  I.click(firstRestoUnlike);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.saveScreenshot('cancel_liking_the_restaurant.png');

  I.amOnPage('/#/favorite');

  await I.waitForElement('.card-not-found');
  I.see('Belum ada Restaurant yang difavorite kan', '.card-not-found');

  I.saveScreenshot('make_sure_cancel_liking_restaurant.png');

  assert.strictEqual(firstRestoIdLike, unlikeRestoId);
});
