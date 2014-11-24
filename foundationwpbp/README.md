Foundation5 WordPress Boilerplate
=====================

A Foundation5 WordPress boilerplate theme created for the Front End North County San Diego meetup group on Feb 20, 2014

1) The tools I use (sublimetext, AMPPS, chrome)

2) A basic WP site has already been setup

3) Define a new theme with a bare bones style.css and index.php

4) The Loop

5) Template Hierarchy - http://codex.wordpress.org/Template_Hierarchy#Visual_Overview

6) get_header() and get_footer() (as well as wp_head and wp_footer)

7) template_part()

8) functions.php

9) Enqueueu scripts and styles - twentythirteen_scripts_styles

10) Sidebar

- get_sidebar() function

- Register Sidebar: twentythirteen_widgets_init()

11) Menus - http://codex.wordpress.org/Navigation_Menus

- Define theme support: twentythirteen_setup

```
	<?php wp_nav_menu( array( 
	'theme_location'	=> 'primary'
	, 'menu_class'		=> ''
	, 'container'		=> false
	, 'container_class' => ''
	, 'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>'
	, 'walker' => new Zurb_Foundation_Walker_Nav_Menu()
	) ); ?>
```
```
//Change the class on a menu item that has a child
add_filter( 'wp_nav_menu_objects', 'parent_nav_item' );
function parent_nav_item( $items ) {
	$parents = array();
	foreach ( $items as $item ) {
		if ( $item->menu_item_parent && $item->menu_item_parent > 0 ) {
			$parents[] = $item->menu_item_parent;
		}
	}
	
	foreach ( $items as $item ) {
		//If the menu item has children items
		if ( in_array( $item->ID, $parents ) ) {
			$item->classes[] = 'has-dropdown not-click'; 
		}
		//If the menu item is a top level link
		if($item->menu_item_parent == 0){
			$item->url = "";
		}
	}

	return $items;    
}

//Add an 'active' class to the menu item that corresponds to the current page
add_filter('nav_menu_css_class' , 'active_nav_item' , 10 , 2);
function active_nav_item($classes, $item){
     if( in_array('current-menu-item', $classes) ){
             $classes[] = 'active ';
     }
     return $classes;
}

//The Zurb Foundation Walker Nav Menu
class Zurb_Foundation_Walker_Nav_Menu extends Walker_Nav_Menu {

	//Add a class to an element that has child elements
	function start_lvl(&$output, $depth) {
		$indent = str_repeat("\t", $depth);
		$output .= "\n$indent<ul class=\"dropdown\">\n";
	}
}
```

12) Extra: Child Theme Development

Setup
===

Make a copy of wp-config-sample.php, rename it to wp-config.php

Make a new database, and enter the correct DB name, username, and user password to wp-config.php

Import database.sql to the database

Login as the admin user with username: masteruser | password: correcthorsebatterystaple
