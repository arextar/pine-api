function Achievement (data, parent) {
	this.slug = data.slug;
	this.title = data.title;
	this.desc = data.desc;
	this.icon = data.icon;
	this.progress = data.progress;
	this.goal = data.goal;

	this.parent_pine = parent;
}

Achievement.prototype = {
	isComplete: function () {
		return this.progress >= this.goal;
	},

	incr: function (amount, options) {
		if ('object' === typeof amount) {
			options = amount;
			amount = 1;
		}

		if (!amount) amount = 1;

		if (this.progress < this.goal) this.progress += amount;

		if (this.progress >= this.goal && (!options || options.notify !== false)) this.parent_pine.emit('achievement', this);
		this.ws.emit('set_achievement', this.slug, this.progress);
	},

	set: function (amount, options) {
		// Constrain the amount
		this.progress = amount < 0 ? 0 : amount > this.goal ? this.goal : amount;

		if (this.progress >= this.goal && (!options || options.notify !== false)) this.parent_pine.emit('achievement', this);
		this.ws.emit('set_achievement', this.slug, this.progress);
	},

	unlock: function (options) {
		this.progress = this.goal;

		if (!options || options.notify !== false) this.parent_pine.emit('achievement', this);
		this.ws.emit('set_achievement', this.slug, this.progress);
	}
};

pine_fn.Achievement = Achievement;

pine_fn.getAchievement = function (name) {
	return new Achievement(this.data.achievements_data[name], this);
};