# Forcescroll.js
A simple libraries that force user to scroll to presetted points
<h2>Setup</h2>
<ol>
  <li>Download this repository</li>
  <li>Add "forcescroll.js" file to your project</li>
  <li>Implements jquery where you want use this library <br>(go to https://www.w3schools.com/jquery/jquery_get_started.asp)</li>
  <li>Add this script in your file "<script type="text/javascript" src="js/forcescroll.js"></script>"</li>
  <li>Use simple initialization in your existing .js file writing "forceScroll();"</li>
  <li>Place point where you want the page scroll adding class "scroll-point" in the tag</li>
</ol>
<h2>Other way to initialize</h2>
<h3>Make it active in all devices but not in those that use the touch</h3>
<p>Replace "forceScroll();" with "forceScroll(false);"</p>
<h3>Make able on devices with ceartain sizes</h3>
<p>
  Select devices where you want this script will work (based on width size):
  <ul> 
    <li>xs < 576px</li>
    <li>576px < sm <= 768px</li>
    <li>768px < md <= 992px</li>
    <li>992px < lg <= 1200px</li>
    <li>xl > 1200px</li>
  </ul>
  Replace "forceScroll();" with "forceScroll("[sizes]");"<br>
  Instead of "[sizes]" write select sizes sapareted by space (es. "xd lg xl")
</p>
<h3>Make able on devices with ceartain sizes but not in those that use the touch</h3>
<p>
  Select devices where you want this script will work (based on width size):
  <ul> 
    <li>xs < 576px</li>
    <li>576px < sm <= 768px</li>
    <li>768px < md <= 992px</li>
    <li>992px < lg <= 1200px</li>
    <li>xl > 1200px</li>
  </ul>
  Replace "forceScroll();" with "forceScroll("[sizes]", false);"<br>
  Instead of "[sizes]" write select sizes sapareted by space (es. "xd lg xl")
</p>
