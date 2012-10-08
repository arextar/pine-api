function Achievement (data, parent) {
	this.title = data.title;
	this.desc = data.desc;
	this.icon = data.icon;
	this.progress = data.progress;
	this.goal = data.goal;

	this.parent_pine = parent;
}

Achievement.prototype = {
	complete: function () {
		return this.progress => this.goal;
	},

	incr: function (amount, options) {
		if ('object' === typeof amount) {
			options = amount;
			amount = 1;
		}

		if (!amount) amount = 1;

		if (this.progress < this.goal) this.progress += amount;

		if (this.progress >= this.goal && (!options || options.notify !== false)) this.parent_pine.emit('achievement', this)
	},

	set: function (amount, options) {
		// Constrain the amount
		this.progress = amount < 0 ? 0 : amount > this.goal ? this.goal : amount;

		if (this.progress >= this.goal && (!options || options.notify !== false)) this.parent_pine.emit('achievement', this)
	}
};

pine_fn.Achievement = Achievement;

pine_fn.getAchievement = function (name) {
	return new Achievement(this.data.achievements_data[name], this)
}