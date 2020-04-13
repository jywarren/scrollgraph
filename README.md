# Scrollgraph

Create high res images by scrolling around at low res in video.

============

TODO now:

X make initial display of 2 images with interest points circled in blue and red
X figure out weird offset ratios
X fix them

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

