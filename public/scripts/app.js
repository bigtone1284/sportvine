var VideosBox = React.createClass({
	componentDidMount: function () {
		'use strict';
    this.loadVideosFromServer();
    // setInterval(this.loadVideosFromServer, this.props.pollInterval);
  },
	getInitialState: function () {
		'use strict';
		return {
			data: []
		};
	},
	loadVideosFromServer: function(page) {
		'use strict';
		page = page || 1;
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      data: {
				page: page
      },
      cache: false,
      success: function(videos) {
        this.setState({
        	data: this.state.data.concat(videos.data.records),
        	page: page
        });
        console.log(this.state.data[0].description);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  onScroll: function(e) {
		'use strict';
		var windowWidth = $(window).width(),
			videosBox = this.refs.myVideosBox,
			videosBoxWidth = videosBox.scrollWidth,
			videosBoxLeft = videosBox.scrollLeft;
		if (videosBoxWidth < videosBoxLeft + windowWidth + 100) {
			// this.loadVideosFromServer(this.state.page + 1)
		}
  },
	render: function () {
		'use strict';
		var videoNodes = this.state.data.map(function(video) {
      return (
        <VideoBox data={video} />
      );
    });
    return (
      <div className='videosBox'
      onScroll={this.onScroll}
      ref={'myVideosBox'}>
      	<h2>Video Box Here</h2>
      	{videoNodes}
      </div>
    );
  }
});
var VideoBox = React.createClass({
	render: function () {
		'use strict';
		return (
			<div className='videoBox'>
				<VideoElement
					description={this.props.data.description}
					videoUrl={this.props.data.videoUrl}/>
			</div> 
		);
	}
});
var VideoElement = React.createClass({
	onMouseEnter: function(e) {
		'use strict';
		this.refs.myVideo.play();
	},
	onMouseOut: function(e) {
		'use strict';
		this.refs.myVideo.pause();
	},
	render: function () {
		'use strict';
		return (
			<video
				autoplay="true"
				className='videoElement'
				controls="true"
				loop="true"
				onMouseEnter={this.onMouseEnter}
				onMouseOut={this.onMouseOut}
				ref={'myVideo'}
				title={this.props.description}>
				<source src={this.props.videoUrl} type="video/mp4" />
			</video>
		);
	}
});
ReactDOM.render(
  <VideosBox
  	url="/nbaVines"
  	pollInterval={10000}
  	page={1} />,
  document.getElementById('content')
);