var Delay = function(context, parameters) {

	this.context = context;
	this.input = context.createGain();

	// create nodes
	this.delayLine = context.createDelay();
	this.feedbackGain = context.createGain();
	this.wetGain = context.createGain(); 
	this.dryGain = context.createGain();

	// connect 
	this.input.connect(this.delayLine);
	this.delayLine.connect(this.feedbackGain);
	this.feedbackGain.connect(this.wetGain);
	this.feedbackGain.connect(this.delayLine);

	this.input.connect(this.dryGain);

	// default
	this.dryGain.connect(this.context.destination);
	this.wetGain.connect(this.context.destination);

	this.delayLine.delayTime.value = parameters.delayTime;
	this.feedbackGain.gain.value = parameters.delayFeedbackGain;

	this.wetGain.gain.value = parameters.delayWetDry;
	this.dryGain.gain.value = (1-parameters.delayWetDry);

	this.parameters = parameters;
}


Delay.prototype.updateParams = function (params, value) {

	switch (params) {
		case 'delay_time': 
			this.parameters.delayTime = value;
			this.delayLine.delayTime.value = value;
			break;		
		case 'delay_feedback_gain': 
			this.parameters.delayFeedbackGain = value;
			this.feedbackGain.gain.value = value;
			break;		
		case 'delay_dry_wet':
			this.parameters.delayWetDry = value;
			this.wetGain.gain.value = value;
			this.dryGain.gain.value = 1 - value;
			break;		
	}
}

Delay.prototype.connect = function(fx_node) {

	this.dryGain.disconnect(this.context.destination);
	this.wetGain.disconnect(this.context.destination);
	this.dryGain.connect(fx_node.input);
	this.wetGain.connect(fx_node.input);
}
