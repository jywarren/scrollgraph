# Scrollgraph

Create high res images by scrolling around at low res in video.

============

## Options

* `debug`: show debug comments in the log
* `annotations`: display markers in the canvas to help debugging
* `vignette`: draw to the canvas in an edge-blurred circle, to improve image compositing and look awesome (reduces field of view of image, though)
* `goodMatchesMin`: default 8; frames must have this many good matches to be displayed
* `keyframeThreshold`: default 2; keyframes must have 2x number of good matches
* `keyframeDistanceThreshold`: default 1/3; keyframes must be this far off of last keyframe origin
* `num_train_levels`:  default 4; keypoint finder at different zoom levels; not needed if no resizing happens (as in microscopy)
* `trainingMargin`: default 0.1, // the width of the margin we discard when training a pattern, to improve matching; as a proportion from 0 to 1
* `width`: default 1000; width of canvas
* `height`: default 1000; width of canvas
* `srcWidth`: default 640; width of video source (bigger may degrade performance)
* `srcHeight`: default 480; height of video source

## Methods

* `scrollgraph.train(img1)`
* `scrollgraph.match(img2)` returns a `results` object with the following parameters and functions:
  * `results.good_matches`
  * `results.num_matches`
  * `results.num_corners`
  * `results.projected_corners`
  * `results.annotate(ctx, offset)`
* `scrollgraph.setOption(key, value)`: change options dynamically, i.e. turn on annotations

## Terminology

* each image placed on the canvas is called a `frame`
* each image "good enough" to establish a new local origin point is called a `keyframe`, and is used to train our matcher against for subsequent matches

## Basic approach

* from the original image (our first `keyframe`), we train our matcher to look in the incoming video feed for a similar "constellation" of points, regardless of rotation
* when enough "good matches" are found in a video frame, we place that frame on the canvas at the estimated position (using the findTransform method from jsfeat)
* we repeat as fast as we can!
* if an image is really good, and ALSO far enough away from the last keyframe, and enough time has passed (500ms), we 

## Optimizations

A range of tweaks and optimizations have been added to create a more responsive experience (which gets "stuck" less often).

* we relax thresholds for both frames and keyframes if no recent matches have been made (500ms)
* we reject frames that are > ~15 degrees different rotation than the last keyframe
* we reject frames that are > 1.5x displaced from the last keyframe

### To do

* [] set default train() to train($('video')[0])

* [ ] figure out canvas scaling to not be a gigantic webpage? div scrolling?
  * google canvas page scale

* [ ] reject blurry keyframes? Tough: https://stackoverflow.com/q/7765810/1116657, https://stackoverflow.com/q/6646371/1116657
* [ ] optimizations:
  * [x] keyframes must not happen too often - balance with responsiveness...? use time/distance threshold?
  * [ ] cap points from each image
  * [ ] can we use only lower res keyframes? 1/2 resolution? options.keyframeScale !
* [ ] we could say, if it's been 2 seconds since last keyframe, try a lower threshold?

* [x] if no matches for X seconds, try other past keyframes?
  * we relax thresholds for both frames and keyframes if no recent matches have been made (500ms)


## Stuck

* [ ] detect landscape/portrait (done but needs testing)
  * [ ] doesn't work - video seems OK but canvas is not
* [ ] scale images according to points 1 and 2
  * [ ] scaling works, but keyframes then would need to be scaled too? do we need to track scale?
  * [x] turned scaling off, can re-enable as an option to fix it

## Longer term

* [ ] try placing perspectivally, using WebGL/glfx.js: https://github.com/jywarren/webgl-distort/blob/main/dist/webgl-distort.js
* [ ] bump some work to another thread? Web Workers?
* [ ] focus knockout - higher sharpness images overwrite lower sharpness images
* [ ] refactor `jsfeat`-based resize/resample to use canvas?
* [x] make multi-level training toggle-able, and use it in LDI matching if 2 images are different sizes?
  * [x] we're now only doing this if you set `num_train_levels` to > 1

## Done

* [x] get jsfeat demo working
* [x] refactor into separate modules
* [x] get it working again
* [x] externalize `match()` to be run in scrollgraph?
* [x] refactor `train_pattern()` to accept new image/vid input
* [x] pass out `good_matches` from `match()` 
* [x] can we make the multiscale pyramid toggle-able - yes, set `num_train_levels` to 1
* [x] don't run on each video frame, only when a match is requested?
    * [x] maybe we need a working canvas and a display canvas
* [x] place image only if a match happens
* [x] average `shape_pts` corners to place the image (short term solution)
* [x] make resolution configurable - not just 640x480
* [x] draw box around key images
* [x] mark points
* [x] crop in/out the image used to train... use only the center for some reason??
* [x] scale up the points too, to account for scale down of image
* [x] use x,y offset + num matches to find new keyframes. Plus high rankings
* [x] add rotation
* [x] tweak cumulative offest settings
* [x] figure out black screen startup error (i think!)
* [x] rotation error - esp when annotations are on (might be 2 issues)
  * [x] putImageData doesn't respect ctx.translate!!! SOLVED by transferring to a drawImage call
  * [M] now, keyframes don't respect rotation. Do we need to set a global ctx.rotate and leave it running?
    * maybe solved! Needs testing...
* [x] figure out ~10px error in keyframe placement, see if this addresses drift
    * see if rotation fixes solve this... i think it does... keep testing
* [x] make mask larger
* [x] use intermediate canvas to perform masking?
* [x] do NOT mask on the working canvas... just on pasting onto the display canvas

