# Scrollgraph

Create high res images by scrolling around at low res in video.

============

TODO now:

X make initial display of 2 images with interest points circled in blue and red
X figure out weird offset ratios
  * so... the pixels in img1 are off by 1.5625, or 1000/640 or 800/512.
  * the pixels in img2 are off by 1.25, or 600/480 or 1000/800, or 800/640
  * is it matching points across the whole image, but reporting them in only 640x480 pixel space?
BRAINSTORM
* try doing it with 640x480 images???
* look for 1000 ratios in the code or defaults?
  * or in matcher-core?
  * check default image sizes in matcher core demos?

LEARNED:
* at 640x480, both sets of points are correct at 1.25
NOTE: we may have a max image dimension of 512... somewhere? https://github.com/inspirit/jsfeat/search?q=512&unscoped_q=512
  * maxPatternSize in matcher-core, too!
  * PROBABLY we are resizing the image to 512x512 before finding matches? YES: jsfeat.imgproc.resample(imgg, lev0Img, newWidth, newHeight);
    * here, we choose whichever is the larger dimension? https://github.com/publiclab/matcher-core/blob/68d7e6bb47f499df19d41f8dca3dd47498f4bad3/src/orb.core.js#L100-L103

  * YESSSSSS If we downscale 640x480 to 512x384, we need to scale up the output coords by 1.25 to get back!!!!
    * how about 800x600? YESSS 600/384 = 1.5625!!!!

##########################
WE NEED TO UNDO THE SCALING AFTER IT RETURNS AN IMAGE WITHIN A 512px SQUARE
however, maybe the second image is done differently? as it was always in 1.25? 1.25x1.25 = 1.5625 OMGGGGGG
##########################
==> ok, we also need to know why img2 is always off by 1.25 while img1 varies
* haven't yet found coord conversions for img2... 
  * one lead is: where secImage is used near putImageData??
  * second is to put some points in the max x/y location and see the returned keypoint coords

* does the second image not need to be adjusted because it's overwritten somehow onto the first one?? Where's the resample? 


* use function findTransform(matches, count, patternCorners, screenCorners, homo3x3, matchMask) {
  * https://github.com/rexagod/matcher-core/blob/b47f3b0e63bcbd8931b1503d57b926915049f4d6/assets/utils/orb.findTransform.js#L3

=============

https://github.com/publiclab/matcher-core
Reference implementation: https://github.com/publiclab/Leaflet.DistortableImage/pull/312

* create a canvas
* be able to insert an image onto it
* store previous image in a stack, n deep, and x,y location
* be able to fetch current canvas as an image (as a fallback)
* use Matcher to find matches

Setup

X get canvas working with dummy image
X get matcher working with 2 images

Phase 1

* place image at x,y relative to orig image
  * idea 1: 
    * find best 2 matches (see sorting by confidence here: https://github.com/publiclab/Leaflet.DistortableImage/pull/312/files#diff-edfdd198986795d35dcb901669e98a76R71-R73)
    * calculate rotation change
    * calculate scale change
=========
    * simple version: rotate and scale each point with regard to the best matched point pair: https://github.com/publiclab/Leaflet.DistortableImage/pull/312/files#diff-e34c8bba204508e1ca7a769871a3800eR81-R99
      * first, find x,y offset of best match (later could find 2 or more and average)
      * second, calculate angle change between best and 2nd best match to get rotation (again, could repeat and average later)
      * use canvas rotation to place image at x,y offset and rotation
      * see if ranking can be used to discard outliers? Else consider other metrics, RANSAC
=========
    * better fits: use rotation and scale change OR input points for a matrix transform
	* this is called a homography matrix and a homography transform; example here: https://www.mathworks.com/matlabcentral/answers/26141-homography-matrix
        * In it, you choose your best points, sifting out bad matches, and you use them to calculate a matrix transform:
          * https://stackoverflow.com/a/21929184/1116657
          * could maybe search for 1st order polynomial transform - calculating affine transform matrices from 3+ points
          * HERE: https://inspirit.github.io/jsfeat/#multiview
* don't yet try to use whole canvas, just use last image
* don't rotate or anything yet

Phase 2

* try to distort image using webgl-distort before placement
* place using upper-left corner

