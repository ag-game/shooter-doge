
	const BULLET_SPEED = 640;
	const ENEMY_SPEED = 60;
	// const PLAYER_SPEED = 120;
  const PLAYER_SPEED = 160;

	add([
		sprite("nightsky"),
		scale(width() / 240, height() / 240),
	]);

	add([
		sprite("stars"),
		scale(width() / 240, height() / 240),
		pos(0, 0),
		"stars",
	]);

	add([
		sprite("stars"),
		scale(width() / 240, height() / 240),
		pos(0, -height()),
		"stars",
	]);

	action("stars", (r) => {
		r.move(0, 32);
		if (r.pos.y >= height()) {
			r.pos.y -= height() * 2;
		}
	});

	const player = add([
		sprite("jade_transparent"),
		pos(width() / 2, height() - 16),
		origin("center"),
	]);

	keyDown("left", () => {
		player.move(-PLAYER_SPEED, 0);
	});

	keyDown("right", () => {
		player.move(PLAYER_SPEED, 0);
	});

	function spawnBullet(p) {
		add([
			rect(2, 6),
			pos(p),
			origin("center"),
			color(0.5, 0.5, 1),
			// strings here means a tag
			"bullet",
		]);
	}

	keyPress(["j", "9"], () => {
		spawnBullet(player.pos.sub(4, 0));
		spawnBullet(player.pos.add(4, 0));
    spawnBullet(player.pos.sub(16, 0));
		spawnBullet(player.pos.add(16, 0));
    spawnBullet(player.pos.sub(32, 0));
		spawnBullet(player.pos.add(32, 0));
    spawnBullet(player.pos.sub(52, 0));
		spawnBullet(player.pos.add(52, 0));
    spawnBullet(player.pos.sub(76, 0));
		spawnBullet(player.pos.add(76, 0));
    spawnBullet(player.pos.sub(104, 0));
		spawnBullet(player.pos.add(104, 0));
    spawnBullet(player.pos.sub(136, 0));
		spawnBullet(player.pos.add(136, 0));
    spawnBullet(player.pos.sub(176, 0));
		spawnBullet(player.pos.add(176, 0));
	});

	keyPress(["space", "up"], () => {
		spawnBullet(player.pos.sub(4, 0));
		spawnBullet(player.pos.add(4, 0));
	});

	// run this callback every frame for all objects with tag "bullet"
	action("bullet", (b) => {
		b.move(0, -BULLET_SPEED);
		// remove the bullet if it's out of the scene for performance
		if (b.pos.y < 0) {
			destroy(b);
		}
	});

	function spawnEnemy() {
		return add([
			sprite("dumpsterfire"),
			pos(rand(0, width()), 0),
			"enemy",
		]);
	}

	const score = add([
		pos(12, 12),
		text(0),
		// all objects defaults origin to center, we want score text to be top left
		// plain objects becomes fields of score
		{
			value: 0,
		},
	]);

	// if a "bullet" and a "enemy" collides, remove both of them
	collides("bullet", "enemy", (b, e) => {
		destroy(b);
		destroy(e);
		score.value += 1;
		score.text = score.value;
	});

	action("enemy", (e) => {
		e.move(0, ENEMY_SPEED);
		if (e.pos.y > height()) {
			destroy(e);
		}
	});

	// spawn an enemy every 1 second
	loop(0.5, spawnEnemy);