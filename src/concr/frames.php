<?php

$frames = [
    [
        'name'=>'default',
        'content'=>'
            <div id="container-loads" style="height: 100%">Loading...</div> 
            <header>
                {{header_hook}}
            </header>
            <div class="main" layout="column" flex>
                {{main_hook}}
            </div>
            <footer>
                {{footer_hook}}
            </footer>
            ',
        'hooks'=>['header_hook','main_hook','footer_hook']
    ],
    [
        'name'=>'plain',
        'content'=>'{{main_hook}}',
        'hooks'=>['main_hook']]
];
