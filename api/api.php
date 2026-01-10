<?php
session_start();
header('Content-Type: application/json');

// PUBLIC API: only front-end public data (products, categories, sliders)
require_once('../models/productModel.php');
require_once('../models/categoryModel.php');
require_once('../models/sliderModel.php');

$action = $_REQUEST['action'] ?? '';

$public_actions = ['get_products', 'get_product_details', 'get_categories', 'get_sliders'];

if (!in_array($action, $public_actions, true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Unknown or disabled action']);
    exit();
}

switch ($action) {

    // sliders 
    case 'get_sliders':
        echo json_encode(getAllSliders());
        break;

}
