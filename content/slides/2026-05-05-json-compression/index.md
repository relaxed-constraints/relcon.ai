---
title: "LLM-based Compression of Semi-Structured Data"
date: 2026-05-05
draft: false
type: "slides"
description: "Intro and Dataset Overview"
transition: "none"
event: "UTN Intro"
author: "Thomas Rückstieß"
---

# About Me


- 2006–2011: PhD in Machine Learning, TUM (J. Schmidhuber)
  - Topics: neural networks , reinforcement learning, robotics
<!-- step -->
<div class="colloquium-spacer-md"></div>

- 2012-2025: MongoDB Australia
  - Roles: Technical Support, Program Manager, Engineering Lead, Research Scientist
  - 2022-2025: Head of ML Research (small group of 3 researchers)
  - Focus on ML for semi-structured data

<!-- step -->
<div class="colloquium-spacer-md"></div>

- 2026+: Independent Researcher
  - "Founded" my own "research lab" _Relaxed Constraints_ ([relcon.ai](https://relcon.ai))
  - Collaborations with Sydney University, MongoDB
  - Looking for more collaboration opportunities! 👋

---

# Recent Research

<!-- size: small -->

<!-- rows: 2/7 -->

- Exploiting structure in data for more efficient modelling
- Modified transformer architecture for semi-structured data
- Inductive bias through tokenisation, position encoding, and constrained decoding

===

<!-- row-columns: 1/1 -->

![Keys, values, structural tokens](../2026-04-01-usyd-vldb-paper/tokenization_light.png)

|||

![Modified Architecture](../2026-04-01-usyd-vldb-paper/architecture.png)

---

# Large JSON Datasets

- Github Archive (https://www.gharchive.org/)
- Ember Malware detection (https://arxiv.org/abs/2506.05074)
- Yelp Businesses + Reviews (https://business.yelp.com/data/resources/open-dataset/)
- DDXPlus Medical Diagnosis (https://arxiv.org/abs/2205.09148)
- StackExchange (https://data.stackexchange.com)


---

# Github Archive

<!-- columns: 1/1 -->
<!-- size: small -->

- Public Github events (push, pull request, etc.)
- Data reaching back to 2011 available
- Can filter on different event types
- Basically unlimited data available
- Data for 1 January 2026 3-4pm UTC (1 hour): <br> 208.8 MB -> 38.1 MB (zip) **5.5x compression ratio**

|||

```json
{
  "id": "5567786998",
  "type": "IssuesEvent",
  "actor": {
    "id": 41898282,
    "login": "github-actions[bot]",
    "display_login": "github-actions",
    "gravatar_id": "",
    "url": "https://api.github.com/users/github-actions[bot]",
    "avatar_url": "https://avatars.githubusercontent.com/u/41898282?"
  },
  "repo": {
    "id": 999871860,
    "name": "yanaiela/papers-feed",
    "url": "https://api.github.com/repos/yanaiela/papers-feed"
  },
  "payload": {
    "action": "closed",
    "issue": {
      "url": "https://api.github.com/repos/yanaiela/papers-feed/issues/1028",
      "repository_url": "https://api.github.com/repos/yanaiela/papers-feed",
      "labels_url": "https://api.github.com/repos/yanaiela/papers-feed/issues/1028/labels{/name}",
      "comments_url": "https://api.github.com/repos/yanaiela/papers-feed/issues/1028/comments",
      "events_url": "https://api.github.com/repos/yanaiela/papers-feed/issues/1028/events",
      "html_url": "https://github.com/yanaiela/papers-feed/issues/1028",
      "id": 3774775930,
      "node_id": "I_kwDOO5jVdM7g_oJ6",
      "number": 1028,
      "title": "Stored Object: paper:arxiv.2307.06483",
      "user": {
        "login": "yanaiela",
        "id": 8031035,
        "node_id": "MDQ6VXNlcjgwMzEwMzU=",
        "avatar_url": "https://avatars.githubusercontent.com/u/8031035?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/yanaiela",
        "html_url": "https://github.com/yanaiela",
        "followers_url": "https://api.github.com/users/yanaiela/followers",
        "following_url": "https://api.github.com/users/yanaiela/following{/other_user}",
        "gists_url": "https://api.github.com/users/yanaiela/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/yanaiela/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/yanaiela/subscriptions",
        "organizations_url": "https://api.github.com/users/yanaiela/orgs",
        "repos_url": "https://api.github.com/users/yanaiela/repos",
        "events_url": "https://api.github.com/users/yanaiela/events{/privacy}",
        "received_events_url": "https://api.github.com/users/yanaiela/received_events",
        "type": "User",
        "user_view_type": "public",
        "site_admin": false
      },
      "labels": [
        {
          "id": 8761987689,
          "node_id": "LA_kwDOO5jVdM8AAAACCkFSaQ",
          "url": "https://api.github.com/repos/yanaiela/papers-feed/labels/gh-store",
          "name": "gh-store",
          "color": "ededed",
          "default": false,
          "description": null
        },
        {
          "id": 8761987690,
          "node_id": "LA_kwDOO5jVdM8AAAACCkFSag",
          "url": "https://api.github.com/repos/yanaiela/papers-feed/labels/stored-object",
          "name": "stored-object",
          "color": "ededed",
          "default": false,
          "description": null
        },
        {
          "id": 9919314740,
          "node_id": "LA_kwDOO5jVdM8AAAACTzy7NA",
          "url": "https://api.github.com/repos/yanaiela/papers-feed/labels/UID:paper:arxiv.2307.06483",
          "name": "UID:paper:arxiv.2307.06483",
          "color": "ededed",
          "default": false,
          "description": null
        }
      ],
      "state": "closed",
      "locked": false,
      "assignee": null,
      "assignees": [],
      "milestone": null,
      "comments": 1,
      "created_at": "2026-01-01T14:59:35Z",
      "updated_at": "2026-01-01T14:59:59Z",
      "closed_at": "2026-01-01T14:59:59Z",
      "active_lock_reason": null,
      "sub_issues_summary": {
        "total": 0,
        "completed": 0,
        "percent_completed": 0
      },
      "issue_dependencies_summary": {
        "blocked_by": 0,
        "total_blocked_by": 0,
        "blocking": 0,
        "total_blocking": 0
      },
      "body": "{\n  \"sourceId\": \"arxiv\",\n  \"paperId\": \"2307.06483\",\n  \"url\": \"https://arxiv.org/html/2307.06483v2\",\n  \"title\": \"Misclassification in Automated Content Analysis Causes Bias in Regression. Can We Fix It? Yes We Can!\",\n  \"authors\": \"\",\n  \"abstract\": \"\",\n  \"timestamp\": \"2026-01-01T14:59:35.431Z\",\n  \"rating\": \"novote\",\n  \"publishedDate\": \"\",\n  \"tags\": [],\n  \"doi\": \"\",\n  \"journalName\": \"\",\n  \"sourceType\": \"url\"\n}",
      "reactions": {
        "url": "https://api.github.com/repos/yanaiela/papers-feed/issues/1028/reactions",
        "total_count": 0,
        "+1": 0,
        "-1": 0,
        "laugh": 0,
        "hooray": 0,
        "confused": 0,
        "heart": 0,
        "rocket": 0,
        "eyes": 0
      },
      "timeline_url": "https://api.github.com/repos/yanaiela/papers-feed/issues/1028/timeline",
      "performed_via_github_app": null,
      "state_reason": "completed"
    }
  },
  "public": true,
  "created_at": "2026-01-01T15:00:01Z"
}
```

---

# Ember 2024

<!-- columns: 1/1 -->

- Published malware detection benchmark dataset
- Latest version (2024), a 2017 and 2018 version also available 
- Has different categories with train/test splits
- .NET train split: 4.49 GB -> 937 MB (zip) <br> **4.8x compression ratio**

<div class="colloquium-spacer-lg"></div>

| File Type | Train Total | Test Total | Compressed<br>(Train + Test) |
|-----------|------------:|-----------:|--------------------------:|
| Win32     | 1,560,000   | 360,000    | 14.89 GB                  |
| Win64     |   520,000   | 120,000    |  7.03 GB                  |
| .NET      |   260,000   |  60,000    |  1.16 GB                  |
| APK       |   208,000   |  48,000    |   961 MB                  |
| PDF       |    52,000   |  12,000    |   152 MB                  |
| ELF       |    26,000   |   6,000    |    86 MB                  |

|||

<!-- size: small -->

```json
{
  "md5": "9114262d74901a45cf570acb14ce7590",
  "sha1": "448ca731b41d9a8bbe2688a872c307ad4634e549",
  "sha256": "002bafa236ab2488ca15a6ba7691ffafc88e9c6f3394626eab305672e13ba88a",
  "tlsh": "T1BC744B34E3E84A3AF75F87F6D8330893E3B07251F1D9EB9DA988E1E8144671594065B3",
  "first_submission_date": 1695700667,
  "last_analysis_date": 1720278416,
  "detection_ratio": "0/77",
  "label": 0,
  "file_type": "Dot_Net",
  "family": null,
  "family_confidence": null,
  "behavior": [],
  "file_property": [],
  "packer": [],
  "exploit": [],
  "group": [],
  "histogram": [
    77575,
    10429,
    21019,
    11350,
    21993,
    3772,
    6669,
    2473,
    3168,
    1720,
    8186,
    1513,
    1548,
    881,
    1053,
    1406,
    1137,
    7599,
    2812,
    3119,
    1091,
    873,
    1913,
    2284,
    833,
    835,
    482,
    532,
    841,
    836,
    1095,
    1486,
    2477,
    550,
    2039,
    468,
    453,
    1142,
    592,
    400,
    5330,
    446,
    2773,
    1771,
    1538,
    1257,
    1314,
    404,
    1206,
    647,
    720,
    1536,
    486,
    552,
    764,
    512,
    1133,
    687,
    564,
    574,
    549,
    445,
    382,
    1392,
    523,
    957,
    573,
    1007,
    616,
    727,
    653,
    570,
    419,
    874,
    492,
    350,
    595,
    851,
    500,
    657,
    968,
    369,
    681,
    1111,
    1073,
    583,
    802,
    368,
    2201,
    1035,
    832,
    565,
    345,
    307,
    204,
    2201,
    289,
    3324,
    1083,
    1570,
    1596,
    6474,
    958,
    1586,
    1130,
    3483,
    455,
    843,
    2348,
    1358,
    3243,
    5974,
    1524,
    308,
    3429,
    3174,
    5066,
    1262,
    495,
    344,
    714,
    918,
    368,
    10681,
    2311,
    3556,
    764,
    350,
    1526,
    1084,
    648,
    285,
    304,
    149,
    941,
    224,
    210,
    217,
    197,
    272,
    345,
    434,
    492,
    1906,
    274,
    342,
    262,
    688,
    383,
    163,
    574,
    324,
    275,
    456,
    432,
    239,
    243,
    317,
    319,
    248,
    425,
    582,
    227,
    369,
    1344,
    262,
    168,
    173,
    218,
    476,
    173,
    155,
    172,
    237,
    197,
    187,
    220,
    164,
    224,
    153,
    191,
    322,
    183,
    204,
    218,
    292,
    177,
    204,
    259,
    266,
    208,
    362,
    188,
    288,
    138,
    174,
    287,
    133,
    289,
    130,
    234,
    220,
    288,
    264,
    287,
    202,
    88,
    315,
    125,
    318,
    169,
    240,
    128,
    243,
    94,
    130,
    204,
    134,
    116,
    127,
    164,
    115,
    129,
    558,
    193,
    285,
    97,
    135,
    255,
    149,
    163,
    135,
    127,
    165,
    134,
    205,
    255,
    205,
    112,
    76,
    211,
    258,
    138,
    146,
    203,
    83,
    155,
    90,
    122,
    120,
    144,
    117,
    679,
    156,
    458,
    464
  ],
  "byteentropy": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    807,
    0,
    4,
    4,
    1006,
    1168,
    8189,
    3158,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    18440,
    592,
    1145,
    777,
    5913,
    6262,
    37452,
    21761,
    567,
    147,
    392,
    251,
    106,
    155,
    153,
    95,
    77874,
    7781,
    9655,
    4336,
    3137,
    3557,
    8516,
    10882,
    2386,
    1033,
    1396,
    1310,
    935,
    834,
    580,
    956,
    135104,
    23135,
    17831,
    8071,
    4175,
    6886,
    8476,
    18667,
    6547,
    3716,
    3670,
    1763,
    2013,
    2073,
    1292,
    2341,
    71912,
    15403,
    9868,
    5559,
    3022,
    5254,
    2995,
    11574,
    3781,
    2486,
    2723,
    1349,
    1297,
    1387,
    1346,
    1356,
    26150,
    4030,
    3585,
    3152,
    1799,
    1838,
    2802,
    2434,
    3143,
    1814,
    1161,
    1305,
    1268,
    864,
    1003,
    996,
    8359,
    2410,
    1941,
    1294,
    760,
    1019,
    1390,
    930,
    986,
    764,
    500,
    444,
    563,
    288,
    375,
    505,
    8338,
    2152,
    1783,
    1051,
    874,
    1278,
    1450,
    1038,
    1053,
    1111,
    881,
    859,
    859,
    387,
    627,
    835,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "strings": {
    "numstrings": 2951,
    "avlength": 16.054218908844458,
    "printabledist": [
      71,
      16,
      26,
      8,
      16,
      3,
      5,
      9,
      12,
      20,
      5,
      24,
      12,
      7,
      119,
      17,
      61,
      62,
      39,
      29,
      35,
      22,
      27,
      12,
      7,
      17,
      5,
      3,
      72,
      13,
      67,
      33,
      5,
      563,
      120,
      664,
      346,
      348,
      339,
      312,
      179,
      540,
      13,
      65,
      345,
      448,
      150,
      297,
      440,
      21,
      415,
      867,
      685,
      232,
      181,
      107,
      53,
      36,
      23,
      14,
      19,
      4,
      1,
      1750,
      27,
      2756,
      415,
      1203,
      1237,
      5585,
      473,
      1149,
      770,
      2540,
      94,
      319,
      1916,
      1081,
      2589,
      2204,
      883,
      20,
      2631,
      2175,
      4386,
      904,
      269,
      149,
      420,
      564,
      117,
      7,
      12,
      14,
      2,
      9
    ],
    "printables": 47376,
    "entropy": 4.987971782684326,
    "string_counts": {
      ".click(": 7,
      "btc_wallet": 1,
      "cache": 6,
      "clipboard": 2,
      "command": 1,
      "create": 14,
      "debug": 5,
      "delete": 2,
      "dos_msg": 1,
      "enum": 13,
      "file": 9,
      "hidden": 1,
      "html": 4,
      "https://": 1,
      "ipv4_addr": 3,
      "keyboard": 18,
      "module": 12,
      "onlick": 2,
      "password": 1,
      "process": 9,
      "resource": 8,
      "service": 1,
      "system": 26,
      "thread": 2,
      "token": 3,
      "url": 1,
      "window": 1
    }
  },
  "general": {
    "size": 369152,
    "entropy": 5.994654714012033,
    "is_pe": 1,
    "start_bytes": [
      77,
      90,
      144,
      0
    ]
  },
  "header": {
    "coff": {
      "timestamp": 3069907044,
      "machine": "IMAGE_FILE_MACHINE_I386",
      "number_of_sections": 3,
      "number_of_symbols": 0,
      "sizeof_optional_header": 224,
      "pointer_to_symbol_table": 0,
      "characteristics": [
        "EXECUTABLE_IMAGE",
        "LARGE_ADDRESS_AWARE",
        "DLL"
      ]
    },
    "optional": {
      "magic": 267,
      "subsystem": "IMAGE_SUBSYSTEM_WINDOWS_CUI",
      "major_image_version": 0,
      "minor_image_version": 0,
      "major_linker_version": 48,
      "minor_linker_version": 0,
      "major_operating_system_version": 4,
      "minor_operating_system_version": 0,
      "major_subsystem_version": 4,
      "minor_subsystem_version": 0,
      "sizeof_code": 367104,
      "sizeof_headers": 512,
      "sizeof_image": 393216,
      "sizeof_initialized_data": 1536,
      "sizeof_uninitialized_data": 0,
      "sizeof_stack_reserve": 1048576,
      "sizeof_stack_commit": 4096,
      "sizeof_heap_reserve": 1048576,
      "sizeof_heap_commit": 4096,
      "address_of_entrypoint": 375182,
      "base_of_code": 8192,
      "base_of_data": 0,
      "image_base": 268435456,
      "section_alignment": 8192,
      "checksum": 0,
      "number_of_rvas_and_sizes": 16,
      "dll_characteristics": [
        "DYNAMIC_BASE",
        "NX_COMPAT",
        "NO_SEH",
        "TERMINAL_SERVER_AWARE"
      ]
    },
    "dos": {
      "e_magic": 23117,
      "e_cblp": 144,
      "e_cp": 3,
      "e_crlc": 0,
      "e_cparhdr": 4,
      "e_minalloc": 0,
      "e_maxalloc": 65535,
      "e_ss": 0,
      "e_sp": 184,
      "e_csum": 0,
      "e_ip": 0,
      "e_cs": 0,
      "e_lfarlc": 64,
      "e_ovno": 0,
      "e_oemid": 0,
      "e_oeminfo": 0,
      "e_lfanew": 128
    }
  },
  "section": {
    "entry": ".text",
    "sections": [
      {
        "name": ".text",
        "size": 367104,
        "entropy": 6.008954318190454,
        "vsize": 367012,
        "size_ratio": 0.9944521497919556,
        "vsize_ratio": 1.0002506730025176,
        "props": [
          "CNT_CODE",
          "MEM_EXECUTE",
          "MEM_READ"
        ]
      },
      {
        "name": ".rsrc",
        "size": 1024,
        "entropy": 2.2978231723845504,
        "vsize": 712,
        "size_ratio": 0.0027739251040221915,
        "vsize_ratio": 1.4382022471910112,
        "props": [
          "CNT_INITIALIZED_DATA",
          "MEM_READ"
        ]
      },
      {
        "name": ".reloc",
        "size": 512,
        "entropy": 0.10191042566270775,
        "vsize": 12,
        "size_ratio": 0.0013869625520110957,
        "vsize_ratio": 42.666666666666664,
        "props": [
          "CNT_INITIALIZED_DATA",
          "MEM_DISCARDABLE",
          "MEM_READ"
        ]
      }
    ],
    "overlay": {
      "size": 0,
      "size_ratio": 0,
      "entropy": 0
    }
  },
  "imports": {
    "mscoree.dll": [
      "_CorDllMain"
    ]
  },
  "exports": [],
  "datadirectories": [
    {
      "has_relocs": 1,
      "has_dynamic_relocs": 0
    },
    {
      "name": "EXPORT",
      "size": 0,
      "virtual_address": 0
    },
    {
      "name": "IMPORT",
      "size": 79,
      "virtual_address": 375098
    },
    {
      "name": "RESOURCE",
      "size": 712,
      "virtual_address": 376832
    },
    {
      "name": "EXCEPTION",
      "size": 0,
      "virtual_address": 0
    },
    {
      "name": "SECURITY",
      "size": 0,
      "virtual_address": 0
    },
    {
      "name": "BASERELOC",
      "size": 12,
      "virtual_address": 385024
    },
    {
      "name": "DEBUG",
      "size": 84,
      "virtual_address": 374872
    },
    {
      "name": "COPYRIGHT",
      "size": 0,
      "virtual_address": 0
    },
    {
      "name": "GLOBALPTR",
      "size": 0,
      "virtual_address": 0
    },
    {
      "name": "TLS",
      "size": 0,
      "virtual_address": 0
    },
    {
      "name": "LOAD_CONFIG",
      "size": 0,
      "virtual_address": 0
    },
    {
      "name": "BOUND_IMPORT",
      "size": 0,
      "virtual_address": 0
    },
    {
      "name": "IAT",
      "size": 8,
      "virtual_address": 8192
    },
    {
      "name": "DELAY_IMPORT",
      "size": 0,
      "virtual_address": 0
    },
    {
      "name": "COM_DESCRIPTOR",
      "size": 72,
      "virtual_address": 8200
    },
    {
      "name": "RESERVED",
      "size": 0,
      "virtual_address": 0
    }
  ],
  "richheader": [],
  "authenticode": {
    "num_certs": 0,
    "self_signed": 0,
    "empty_program_name": 0,
    "no_countersigner": 0,
    "parse_error": 0,
    "chain_max_depth": 0,
    "latest_signing_time": 0,
    "signing_time_diff": 0
  },
  "pefilewarnings": [],
  "week_id": 0,
  "caps": [
    {
      "Capability": "Find data using regex in .net",
      "Namespace": "data-manipulation/regex",
      "Addrs": [
        "0x600021f"
      ]
    },
    {
      "Capability": "(internal) .net file limitation",
      "Namespace": "internal/limitation/dynamic",
      "Addrs": []
    },
    {
      "Capability": "Contains pdb path",
      "Namespace": "executable/pe/pdb",
      "Addrs": []
    },
    {
      "Capability": "Compiled to the .net platform",
      "Namespace": "runtime/dotnet",
      "Addrs": []
    }
  ],
  "ttps": [],
  "mbc": []
}
```

---

# Yelp


<!-- columns: 1/1 -->
<!-- size: small -->

- 150k business listings and 7M reviews from Yelp
- Reviews mainly free-text with user and business IDs
- Business listings have more structured metadata (categories, hours,
  attributes, etc.)
- Businesses: 118.9 MB -> 20.9 MB (zip) <br> **5.7x compression ratio** 

|||

```json
{
  "business_id": "dtDM4YlFFS3XXXnwQlaUdw",
  "name": "The Distelfink Bakery",
  "address": "850 S Valley Forge Rd, Ste 12",
  "city": "Lansdale",
  "state": "PA",
  "postal_code": "19446",
  "latitude": 40.2406921,
  "longitude": -75.3039462,
  "stars": 3,
  "review_count": 14,
  "is_open": 0,
  "attributes": {
    "RestaurantsPriceRange2": "2",
    "BusinessParking": "{'garage': False, 'street': False, 'validated': False, 'lot': True, 'valet': False}",
    "BusinessAcceptsCreditCards": "True",
    "RestaurantsDelivery": "True",
    "BikeParking": "True"
  },
  "categories": "Restaurants, Food, Bakeries",
  "hours": {
    "Tuesday": "6:0-18:0",
    "Wednesday": "6:0-18:0",
    "Thursday": "6:0-18:0",
    "Friday": "6:0-18:0",
    "Saturday": "6:0-17:0",
    "Sunday": "6:0-14:0"
  }
}
```

---

# DDXPlus


<!-- columns: 1/1 -->
<!-- size: small -->

- Published synthetic medical diagnosis dataset (NeurIPS 2022 Datasets & Benchmarks track)
- 1.16M patient cases with demographics, symptoms and diagnoses (train + test split)
- Train split: 703.5 MB -> 111.3 MB (zip) <br> **6.3x compression ratio**


|||

```json
{
  "AGE": 37,
  "DIFFERENTIAL_DIAGNOSIS": [
    [
      "Acute rhinosinusitis",
      0.2575738639
    ],
    [
      "Chronic rhinosinusitis",
      0.2406536271
    ],
    [
      "Bronchitis",
      0.2201494558
    ],
    [
      "Cluster headache",
      0.1264615647
    ],
    [
      "Chagas",
      0.0775807442
    ],
    [
      "Anemia",
      0.0775807442
    ]
  ],
  "SEX": "F",
  "PATHOLOGY": "Chronic rhinosinusitis",
  "EVIDENCES": [
    "E_53",
    "E_54_@_V_181",
    "E_54_@_V_192",
    "E_55_@_V_89",
    "E_55_@_V_108",
    "E_55_@_V_109",
    "E_55_@_V_122",
    "E_55_@_V_125",
    "E_56_@_6",
    "E_57_@_V_89",
    "E_57_@_V_122",
    "E_57_@_V_166",
    "E_57_@_V_167",
    "E_58_@_3",
    "E_59_@_1",
    "E_79",
    "E_103",
    "E_116",
    "E_118",
    "E_120",
    "E_121",
    "E_124",
    "E_125",
    "E_182",
    "E_201",
    "E_204_@_V_10",
    "E_226"
  ],
  "INITIAL_EVIDENCE": "E_53"
}
```

---

# StackExchange 

<!-- columns: 1/1 -->
<!-- size: small -->

- Relational dataset of many tables: posts, users, comments, badges, ...
- Native format is XML 
- StackOverflow largest, other subsets available (e.g. Math Exchange)
- We created a JSON version of Math Exchange:<br>8 tables reduced to 3 collections: posts, users, postHistory with other tables embedded
- 3.8M posts: 7.29 GB -> 2.0 GB (zip) <br> **3.6x compression ratio**

|||

```json
{
  "postId": 1,
  "postTypeId": 1,
  "acceptedAnswerId": 9,
  "ownerUserId": 10,
  "lastEditorUserId": 32803,
  "score": 197,
  "viewCount": 12829,
  "commentCount": 2,
  "creationDate": {
    "$date": "2010-07-20T19:09:27.200Z"
  },
  "lastActivityDate": {
    "$date": "2023-05-17T06:11:58.107Z"
  },
  "lastEditDate": {
    "$date": "2018-03-01T19:53:22.017Z"
  },
  "body": "<p>Can someone explain to me how there can be different kinds of infinities?</p>\n\n<p>I was reading \"<a href=\"http://en.wikipedia.org/wiki/The_Man_Who_Loved_Only_Numbers\" rel=\"noreferrer\">The man who loved only numbers</a>\" by <a href=\"http://en.wikipedia.org/wiki/Paul_Hoffman_(science_writer)\" rel=\"noreferrer\">Paul Hoffman</a> and came across the concept of countable and uncountable infinities, but they're only words to me.</p>\n\n<p>Any help would be appreciated.</p>\n",
  "title": "What Does it Really Mean to Have Different Kinds of Infinities?",
  "tags": [
    "|elementary-set-theory|intuition|infinity|faq|"
  ],
  "answerCount": 9,
  "comments": [
    {
      "commentId": 9976274,
      "userId": 960957,
      "score": 1,
      "creationDate": {
        "$date": "2023-06-02T11:08:30.117Z"
      },
      "text": "Hi there! You have asked Question ID 1. I don't know if you have ever noticed it before. But just mentioning it out"
    },
    {
      "commentId": 10020994,
      "userId": 10,
      "score": 3,
      "creationDate": {
        "$date": "2023-06-30T14:47:47.177Z"
      },
      "text": "I had not. It's actually strange since there were other questions on the site at the time. Thanks for pointing it out. :)"
    }
  ]
}
```