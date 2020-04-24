# Scrollgraph

Create high res images by scrolling around at low res in video.

============

## Options

* `goodMatchesMin` - 

### Methods

* `scrollgraph.train(img1)`
* `scrollgraph.match(img2)` returns a `results` object with the following parameters:
  * `results.good_matches`
  * `results.num_matches`
  * `results.num_corners`
  * `results.projected_corners`
  * `results.annotate(ctx, offset)`

### To do

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

#################
* [x] crop in/out the image used to train... use only the center for some reason??
* [x] scale up the points too, to account for scale down of image
#################

* [x] use x,y offset + num matches to find new keyframes. Plus high rankings
* [x] add rotation
* [x] tweak cumulative offest settings
* [ ] detect landscape/portrait

* [ ] reject blurry keyframes
* [ ] optimizations:
  * [ ] keyframes must not happen too often
  * [ ] cap points from each image
  * [ ] can we use only lower res keyframes? 1/2 resolution? options.keyframeScale !
* [ ] scale images according to points 1 and 2

* [ ] if no matches for X seconds, try other past keyframes?



* [ ] try placing using WebGL/glfx.js: https://github.com/jywarren/webgl-distort/blob/main/dist/webgl-distort.js
* [ ] bump stuff to another thread? Web Workers?
* [ ] focus knockout
* [ ] refactor resample to use canvas?
* [ ] make multi-level training toggle-able, and use it in LDI matching if 2 images are different sizes?


