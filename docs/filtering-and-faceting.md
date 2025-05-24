# Filtering and Faceting

![image.png](image%2014.png)

## Overview

This documentation explains the filtering and faceting interface for SearchPro Studio, which allows users to configure search filters for their applications.

Facets are filter options shown on your search page. They show you all possible values for a field based on your search results. You can click these options to narrow down your search and find exactly what you're looking for. 

## Filter Configuration

### Main Components

- Filters Panel - Displays all configured filters
- Add Filter Button - Located in the top-right corner
- Search Options - Search box for finding specific filter configurations

### Filter Properties

| **Property** | **Description** |
| --- | --- |
| Field | The data field to use for filter aggregation |
| Control | The type of control used for the filter |
| Display Name | The filter name shown in search results |

## Adding a New Facet

When adding a new facet, the following fields are required:

- **Field** - Select the field to use for the filter aggregation from the dropdown menu
- **Display Name** - Enter a facet name that will be displayed on the search result
- **Filter Type** - Choose between Terms or Range filtering options
- **Parent Filter** - Optionally select a parent filter for hierarchical filtering

## Best Practices

- Use clear, descriptive display names for filters
- Configure parent-child relationships appropriately for hierarchical data
- Choose the appropriate filter type based on your data structure

## Reordering Filters

Filters can be reordered to customize their display order in the search interface. To reorder filters:

![image.png](image%2015.png)

- Click on the Reorder button to open Reordering panel
- Click and hold the drag handle (≡) next to any filter in the Filters Panel
- Drag the filter up or down to the desired position
- Release to drop the filter in its new location

Your changes will be saved automatically and show up in SearchPro Browse section right away. You can arrange filters by what's most important or by grouping similar ones together. To see your changes on the live site, remember to click the publish button.

### Tips for Filter Organization

- Place frequently used filters at the top for easy access
- Group related filters together
- Keep parent filters above their child filters

## Edit Filter

The Edit Filter section allows you to modify existing filters or create new ones. There are two main types of filters available:

- **Terms Filter:** Used for categorical data where users select from discrete values (e.g., colours, sizes, categories)
- **Range Filter:** Used for numerical data where users can select a range of values (e.g., price, dates, measurements)

Each filter type has its own configuration options to customize how it appears and functions in the search interface. Below you'll find detailed information about configuring both types of filters.

### Terms Filter

The Terms Filter editor lets you control how filters look and work in your search interface. You can change basic settings like the filter's name and how it connects to other filters. You can also choose what type of control to use (like checkboxes or dropdown menus), and set up options like whether users can select multiple items at once and how the filter choices are sorted.

- **Display Name** - Enter a name for your filter that will appear in the search results (example shown: "Material")
- **Parent Filter** - Optional setting where you can select a parent filter if you want to create nested filtering
- **Select Control** - Choose the type of control to display for this filter
- **Enable filter** - Toggle switch to enable/disable the filter
- **Allow Multiple Filter Selection** - Toggle switch to allow users to select multiple values
- **Limit** - Set the number of buckets (options) returned, defaults to 20
- **MinCount** - Set the minimum count threshold for buckets to be displayed, defaults to 1
- **Sort** - Specify how the filter buckets should be sorted

After configuring these settings, you can save your changes using the "Save Changes" button in the top right. To see your changes on the live site, remember to click the publish button.

### Range Filter

Key configuration options include:

- **Display Name** - Enter a name that will appear in search results
- **Parent Filter** - Optional setting to select a parent filter for nested filtering
- **Select Control** - Choose the display control type
- **Enable filter** - Toggle to enable/disable the filter
- **Allow Multiple Filter Selection** - Toggle to allow selecting multiple values

The Range section allows you to:

- Add multiple ranges by clicking "Add range"
- For each range, specify:
    - Label (e.g., "£1000 - £5000")
    - From value (e.g., 1000)
    - To value (e.g., 5000)