--
-- PostgreSQL database dump
--
-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1
-- Started on 2019-01-30 00:10:18
SET
    statement_timeout = 0;
SET
    lock_timeout = 0;
SET
    idle_in_transaction_session_timeout = 0;
SET
    client_encoding = 'UTF8';
SET
    standard_conforming_strings = on;
SELECT
    pg_catalog.set_config('search_path', '', false);
SET
    check_function_bodies = false;
SET
    client_min_messages = warning;
SET
    row_security = off;
SET
    default_tablespace = '';
SET
    default_with_oids = false;--
    -- TOC entry 212 (class 1259 OID 17306)
    -- Name: adventure; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.adventure (
        id integer NOT NULL,
        level integer NOT NULL,
        name character(40) NOT NULL,
        idmonster integer NOT NULL
    );
ALTER TABLE
    public.adventure OWNER TO postgres;--
    -- TOC entry 210 (class 1259 OID 17302)
    -- Name: adventure_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.adventure_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.adventure_id_seq OWNER TO postgres;--
    -- TOC entry 2961 (class 0 OID 0)
    -- Dependencies: 210
    -- Name: adventure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.adventure_id_seq OWNED BY public.adventure.id;--
    -- TOC entry 211 (class 1259 OID 17304)
    -- Name: adventure_idmonster_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.adventure_idmonster_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.adventure_idmonster_seq OWNER TO postgres;--
    -- TOC entry 2962 (class 0 OID 0)
    -- Dependencies: 211
    -- Name: adventure_idmonster_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.adventure_idmonster_seq OWNED BY public.adventure.idmonster;--
    -- TOC entry 224 (class 1259 OID 17354)
    -- Name: hero; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.hero (
        id integer NOT NULL,
        name character(30) NOT NULL,
        level integer NOT NULL,
        hptotal integer NOT NULL,
        hpactual integer NOT NULL,
        xp integer NOT NULL,
        levelmaxxp integer NOT NULL,
        gold integer NOT NULL,
        deaths integer NOT NULL,
        monsterskilled integer NOT NULL,
        heroclass character(30) NOT NULL,
        idshield integer NOT NULL,
        idweapon integer NOT NULL,
        idplaystatus integer NOT NULL,
        iddamageproficience integer NOT NULL,
        iddefenceproficience integer NOT NULL
    );
ALTER TABLE
    public.hero OWNER TO postgres;--
    -- TOC entry 218 (class 1259 OID 17342)
    -- Name: hero_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_id_seq OWNER TO postgres;--
    -- TOC entry 2963 (class 0 OID 0)
    -- Dependencies: 218
    -- Name: hero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_id_seq OWNED BY public.hero.id;--
    -- TOC entry 222 (class 1259 OID 17350)
    -- Name: hero_iddamageproficience_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_iddamageproficience_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_iddamageproficience_seq OWNER TO postgres;--
    -- TOC entry 2964 (class 0 OID 0)
    -- Dependencies: 222
    -- Name: hero_iddamageproficience_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_iddamageproficience_seq OWNED BY public.hero.iddamageproficience;--
    -- TOC entry 223 (class 1259 OID 17352)
    -- Name: hero_iddefenceproficience_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_iddefenceproficience_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_iddefenceproficience_seq OWNER TO postgres;--
    -- TOC entry 2965 (class 0 OID 0)
    -- Dependencies: 223
    -- Name: hero_iddefenceproficience_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_iddefenceproficience_seq OWNED BY public.hero.iddefenceproficience;--
    -- TOC entry 221 (class 1259 OID 17348)
    -- Name: hero_idplaystatus_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_idplaystatus_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_idplaystatus_seq OWNER TO postgres;--
    -- TOC entry 2966 (class 0 OID 0)
    -- Dependencies: 221
    -- Name: hero_idplaystatus_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_idplaystatus_seq OWNED BY public.hero.idplaystatus;--
    -- TOC entry 219 (class 1259 OID 17344)
    -- Name: hero_idshield_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_idshield_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_idshield_seq OWNER TO postgres;--
    -- TOC entry 2967 (class 0 OID 0)
    -- Dependencies: 219
    -- Name: hero_idshield_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_idshield_seq OWNED BY public.hero.idshield;--
    -- TOC entry 220 (class 1259 OID 17346)
    -- Name: hero_idweapon_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_idweapon_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_idweapon_seq OWNER TO postgres;--
    -- TOC entry 2968 (class 0 OID 0)
    -- Dependencies: 220
    -- Name: hero_idweapon_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_idweapon_seq OWNED BY public.hero.idweapon;--
    -- TOC entry 217 (class 1259 OID 17330)
    -- Name: inventory_item; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.inventory_item (
        id integer NOT NULL,
        amount integer NOT NULL,
        equiped bit(1) NOT NULL,
        iditem integer NOT NULL
    );
ALTER TABLE
    public.inventory_item OWNER TO postgres;--
    -- TOC entry 215 (class 1259 OID 17326)
    -- Name: inventory_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.inventory_item_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.inventory_item_id_seq OWNER TO postgres;--
    -- TOC entry 2969 (class 0 OID 0)
    -- Dependencies: 215
    -- Name: inventory_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.inventory_item_id_seq OWNED BY public.inventory_item.id;--
    -- TOC entry 216 (class 1259 OID 17328)
    -- Name: inventory_item_iditem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.inventory_item_iditem_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.inventory_item_iditem_seq OWNER TO postgres;--
    -- TOC entry 2970 (class 0 OID 0)
    -- Dependencies: 216
    -- Name: inventory_item_iditem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.inventory_item_iditem_seq OWNED BY public.inventory_item.iditem;--
    -- TOC entry 203 (class 1259 OID 17264)
    -- Name: item; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.item (
        id integer NOT NULL,
        name character(50) NOT NULL,
        price integer NOT NULL
    );
ALTER TABLE
    public.item OWNER TO postgres;--
    -- TOC entry 202 (class 1259 OID 17262)
    -- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.item_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.item_id_seq OWNER TO postgres;--
    -- TOC entry 2971 (class 0 OID 0)
    -- Dependencies: 202
    -- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;--
    -- TOC entry 197 (class 1259 OID 16401)
    -- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.migrations (
        id integer NOT NULL,
        "timestamp" bigint NOT NULL,
        name character varying NOT NULL
    );
ALTER TABLE
    public.migrations OWNER TO postgres;--
    -- TOC entry 196 (class 1259 OID 16399)
    -- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.migrations_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.migrations_id_seq OWNER TO postgres;--
    -- TOC entry 2972 (class 0 OID 0)
    -- Dependencies: 196
    -- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;--
    -- TOC entry 201 (class 1259 OID 17256)
    -- Name: monster; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.monster (
        id integer NOT NULL,
        name character(30) NOT NULL,
        level integer NOT NULL,
        damage integer NOT NULL,
        hp integer NOT NULL,
        shield integer NOT NULL,
        givedxp integer NOT NULL,
        givedgold integer NOT NULL
    );
ALTER TABLE
    public.monster OWNER TO postgres;--
    -- TOC entry 200 (class 1259 OID 17254)
    -- Name: monster_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.monster_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.monster_id_seq OWNER TO postgres;--
    -- TOC entry 2973 (class 0 OID 0)
    -- Dependencies: 200
    -- Name: monster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.monster_id_seq OWNED BY public.monster.id;--
    -- TOC entry 214 (class 1259 OID 17320)
    -- Name: play_status; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.play_status (
        id integer NOT NULL,
        action character(30) NOT NULL,
        monsterskilled integer NOT NULL,
        exp integer NOT NULL,
        timestarted integer NOT NULL
    );
ALTER TABLE
    public.play_status OWNER TO postgres;--
    -- TOC entry 213 (class 1259 OID 17318)
    -- Name: play_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.play_status_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.play_status_id_seq OWNER TO postgres;--
    -- TOC entry 2974 (class 0 OID 0)
    -- Dependencies: 213
    -- Name: play_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.play_status_id_seq OWNED BY public.play_status.id;--
    -- TOC entry 199 (class 1259 OID 17248)
    -- Name: proficience; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.proficience (
        id integer NOT NULL,
        level integer NOT NULL,
        xp integer NOT NULL,
        levelmaxxp integer NOT NULL
    );
ALTER TABLE
    public.proficience OWNER TO postgres;--
    -- TOC entry 198 (class 1259 OID 17246)
    -- Name: proficience_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.proficience_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.proficience_id_seq OWNER TO postgres;--
    -- TOC entry 2975 (class 0 OID 0)
    -- Dependencies: 198
    -- Name: proficience_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.proficience_id_seq OWNED BY public.proficience.id;--
    -- TOC entry 206 (class 1259 OID 17274)
    -- Name: shield; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.shield (
        id integer NOT NULL,
        defence integer NOT NULL,
        iditem integer NOT NULL
    );
ALTER TABLE
    public.shield OWNER TO postgres;--
    -- TOC entry 204 (class 1259 OID 17270)
    -- Name: shield_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.shield_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.shield_id_seq OWNER TO postgres;--
    -- TOC entry 2976 (class 0 OID 0)
    -- Dependencies: 204
    -- Name: shield_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.shield_id_seq OWNED BY public.shield.id;--
    -- TOC entry 205 (class 1259 OID 17272)
    -- Name: shield_iditem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.shield_iditem_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.shield_iditem_seq OWNER TO postgres;--
    -- TOC entry 2977 (class 0 OID 0)
    -- Dependencies: 205
    -- Name: shield_iditem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.shield_iditem_seq OWNED BY public.shield.iditem;--
    -- TOC entry 209 (class 1259 OID 17290)
    -- Name: weapon; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.weapon (
        id integer NOT NULL,
        damage integer NOT NULL,
        iditem integer NOT NULL
    );
ALTER TABLE
    public.weapon OWNER TO postgres;--
    -- TOC entry 207 (class 1259 OID 17286)
    -- Name: weapon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.weapon_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.weapon_id_seq OWNER TO postgres;--
    -- TOC entry 2978 (class 0 OID 0)
    -- Dependencies: 207
    -- Name: weapon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.weapon_id_seq OWNED BY public.weapon.id;--
    -- TOC entry 208 (class 1259 OID 17288)
    -- Name: weapon_iditem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.weapon_iditem_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.weapon_iditem_seq OWNER TO postgres;--
    -- TOC entry 2979 (class 0 OID 0)
    -- Dependencies: 208
    -- Name: weapon_iditem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.weapon_iditem_seq OWNED BY public.weapon.iditem;--
    -- TOC entry 2766 (class 2604 OID 17309)
    -- Name: adventure id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.adventure
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.adventure_id_seq' :: regclass);--
    -- TOC entry 2767 (class 2604 OID 17310)
    -- Name: adventure idmonster; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.adventure
ALTER COLUMN
    idmonster
SET
    DEFAULT nextval('public.adventure_idmonster_seq' :: regclass);--
    -- TOC entry 2771 (class 2604 OID 17357)
    -- Name: hero id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.hero_id_seq' :: regclass);--
    -- TOC entry 2772 (class 2604 OID 17358)
    -- Name: hero idshield; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    idshield
SET
    DEFAULT nextval('public.hero_idshield_seq' :: regclass);--
    -- TOC entry 2773 (class 2604 OID 17359)
    -- Name: hero idweapon; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    idweapon
SET
    DEFAULT nextval('public.hero_idweapon_seq' :: regclass);--
    -- TOC entry 2774 (class 2604 OID 17360)
    -- Name: hero idplaystatus; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    idplaystatus
SET
    DEFAULT nextval('public.hero_idplaystatus_seq' :: regclass);--
    -- TOC entry 2775 (class 2604 OID 17361)
    -- Name: hero iddamageproficience; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    iddamageproficience
SET
    DEFAULT nextval('public.hero_iddamageproficience_seq' :: regclass);--
    -- TOC entry 2776 (class 2604 OID 17362)
    -- Name: hero iddefenceproficience; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    iddefenceproficience
SET
    DEFAULT nextval('public.hero_iddefenceproficience_seq' :: regclass);--
    -- TOC entry 2769 (class 2604 OID 17333)
    -- Name: inventory_item id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.inventory_item
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.inventory_item_id_seq' :: regclass);--
    -- TOC entry 2770 (class 2604 OID 17334)
    -- Name: inventory_item iditem; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.inventory_item
ALTER COLUMN
    iditem
SET
    DEFAULT nextval('public.inventory_item_iditem_seq' :: regclass);--
    -- TOC entry 2761 (class 2604 OID 17267)
    -- Name: item id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.item
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.item_id_seq' :: regclass);--
    -- TOC entry 2758 (class 2604 OID 16404)
    -- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.migrations
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.migrations_id_seq' :: regclass);--
    -- TOC entry 2760 (class 2604 OID 17259)
    -- Name: monster id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.monster
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.monster_id_seq' :: regclass);--
    -- TOC entry 2768 (class 2604 OID 17323)
    -- Name: play_status id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.play_status
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.play_status_id_seq' :: regclass);--
    -- TOC entry 2759 (class 2604 OID 17251)
    -- Name: proficience id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.proficience
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.proficience_id_seq' :: regclass);--
    -- TOC entry 2762 (class 2604 OID 17277)
    -- Name: shield id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.shield
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.shield_id_seq' :: regclass);--
    -- TOC entry 2763 (class 2604 OID 17278)
    -- Name: shield iditem; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.shield
ALTER COLUMN
    iditem
SET
    DEFAULT nextval('public.shield_iditem_seq' :: regclass);--
    -- TOC entry 2764 (class 2604 OID 17293)
    -- Name: weapon id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.weapon
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.weapon_id_seq' :: regclass);--
    -- TOC entry 2765 (class 2604 OID 17294)
    -- Name: weapon iditem; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.weapon
ALTER COLUMN
    iditem
SET
    DEFAULT nextval('public.weapon_iditem_seq' :: regclass);--
    -- TOC entry 2943 (class 0 OID 17306)
    -- Dependencies: 212
    -- Data for Name: adventure; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.adventure (id, level, name, idmonster)
FROM
    stdin;\.--
    -- TOC entry 2955 (class 0 OID 17354)
    -- Dependencies: 224
    -- Data for Name: hero; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.hero (
        id,
        name,
        level,
        hptotal,
        hpactual,
        xp,
        levelmaxxp,
        gold,
        deaths,
        monsterskilled,
        heroclass,
        idshield,
        idweapon,
        idplaystatus,
        iddamageproficience,
        iddefenceproficience
    )
FROM
    stdin;\.--
    -- TOC entry 2948 (class 0 OID 17330)
    -- Dependencies: 217
    -- Data for Name: inventory_item; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.inventory_item (id, amount, equiped, iditem)
FROM
    stdin;\.--
    -- TOC entry 2934 (class 0 OID 17264)
    -- Dependencies: 203
    -- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.item (id, name, price)
FROM
    stdin;\.--
    -- TOC entry 2928 (class 0 OID 16401)
    -- Dependencies: 197
    -- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.migrations (id, "timestamp", name)
FROM
    stdin;\.--
    -- TOC entry 2932 (class 0 OID 17256)
    -- Dependencies: 201
    -- Data for Name: monster; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.monster (
        id,
        name,
        level,
        damage,
        hp,
        shield,
        givedxp,
        givedgold
    )
FROM
    stdin;\.--
    -- TOC entry 2945 (class 0 OID 17320)
    -- Dependencies: 214
    -- Data for Name: play_status; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.play_status (id, action, monsterskilled, exp, timestarted)
FROM
    stdin;\.--
    -- TOC entry 2930 (class 0 OID 17248)
    -- Dependencies: 199
    -- Data for Name: proficience; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.proficience (id, level, xp, levelmaxxp)
FROM
    stdin;\.--
    -- TOC entry 2937 (class 0 OID 17274)
    -- Dependencies: 206
    -- Data for Name: shield; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.shield (id, defence, iditem)
FROM
    stdin;\.--
    -- TOC entry 2940 (class 0 OID 17290)
    -- Dependencies: 209
    -- Data for Name: weapon; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.weapon (id, damage, iditem)
FROM
    stdin;\.--
    -- TOC entry 2980 (class 0 OID 0)
    -- Dependencies: 210
    -- Name: adventure_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.adventure_id_seq', 1, false);--
    -- TOC entry 2981 (class 0 OID 0)
    -- Dependencies: 211
    -- Name: adventure_idmonster_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.adventure_idmonster_seq', 1, false);--
    -- TOC entry 2982 (class 0 OID 0)
    -- Dependencies: 218
    -- Name: hero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_id_seq', 1, false);--
    -- TOC entry 2983 (class 0 OID 0)
    -- Dependencies: 222
    -- Name: hero_iddamageproficience_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_iddamageproficience_seq', 1, false);--
    -- TOC entry 2984 (class 0 OID 0)
    -- Dependencies: 223
    -- Name: hero_iddefenceproficience_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_iddefenceproficience_seq', 1, false);--
    -- TOC entry 2985 (class 0 OID 0)
    -- Dependencies: 221
    -- Name: hero_idplaystatus_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_idplaystatus_seq', 1, false);--
    -- TOC entry 2986 (class 0 OID 0)
    -- Dependencies: 219
    -- Name: hero_idshield_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_idshield_seq', 1, false);--
    -- TOC entry 2987 (class 0 OID 0)
    -- Dependencies: 220
    -- Name: hero_idweapon_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_idweapon_seq', 1, false);--
    -- TOC entry 2988 (class 0 OID 0)
    -- Dependencies: 215
    -- Name: inventory_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.inventory_item_id_seq', 1, false);--
    -- TOC entry 2989 (class 0 OID 0)
    -- Dependencies: 216
    -- Name: inventory_item_iditem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.inventory_item_iditem_seq', 1, false);--
    -- TOC entry 2990 (class 0 OID 0)
    -- Dependencies: 202
    -- Name: item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.item_id_seq', 1, false);--
    -- TOC entry 2991 (class 0 OID 0)
    -- Dependencies: 196
    -- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.migrations_id_seq', 1, false);--
    -- TOC entry 2992 (class 0 OID 0)
    -- Dependencies: 200
    -- Name: monster_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.monster_id_seq', 1, false);--
    -- TOC entry 2993 (class 0 OID 0)
    -- Dependencies: 213
    -- Name: play_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.play_status_id_seq', 1, false);--
    -- TOC entry 2994 (class 0 OID 0)
    -- Dependencies: 198
    -- Name: proficience_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.proficience_id_seq', 1, false);--
    -- TOC entry 2995 (class 0 OID 0)
    -- Dependencies: 204
    -- Name: shield_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.shield_id_seq', 1, false);--
    -- TOC entry 2996 (class 0 OID 0)
    -- Dependencies: 205
    -- Name: shield_iditem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.shield_iditem_seq', 1, false);--
    -- TOC entry 2997 (class 0 OID 0)
    -- Dependencies: 207
    -- Name: weapon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.weapon_id_seq', 1, false);--
    -- TOC entry 2998 (class 0 OID 0)
    -- Dependencies: 208
    -- Name: weapon_iditem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.weapon_iditem_seq', 1, false);--
    -- TOC entry 2778 (class 2606 OID 16409)
    -- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.migrations
ADD
    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);--
    -- TOC entry 2790 (class 2606 OID 17312)
    -- Name: adventure adventure_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.adventure
ADD
    CONSTRAINT adventure_pkey PRIMARY KEY (id);--
    -- TOC entry 2796 (class 2606 OID 17364)
    -- Name: hero hero_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_pkey PRIMARY KEY (id);--
    -- TOC entry 2794 (class 2606 OID 17336)
    -- Name: inventory_item inventory_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.inventory_item
ADD
    CONSTRAINT inventory_item_pkey PRIMARY KEY (id);--
    -- TOC entry 2784 (class 2606 OID 17269)
    -- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.item
ADD
    CONSTRAINT item_pkey PRIMARY KEY (id);--
    -- TOC entry 2782 (class 2606 OID 17261)
    -- Name: monster monster_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.monster
ADD
    CONSTRAINT monster_pkey PRIMARY KEY (id);--
    -- TOC entry 2792 (class 2606 OID 17325)
    -- Name: play_status play_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.play_status
ADD
    CONSTRAINT play_status_pkey PRIMARY KEY (id);--
    -- TOC entry 2780 (class 2606 OID 17253)
    -- Name: proficience proficience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.proficience
ADD
    CONSTRAINT proficience_pkey PRIMARY KEY (id);--
    -- TOC entry 2786 (class 2606 OID 17280)
    -- Name: shield shield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.shield
ADD
    CONSTRAINT shield_pkey PRIMARY KEY (id);--
    -- TOC entry 2788 (class 2606 OID 17296)
    -- Name: weapon weapon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.weapon
ADD
    CONSTRAINT weapon_pkey PRIMARY KEY (id);--
    -- TOC entry 2799 (class 2606 OID 17313)
    -- Name: adventure adventure_idmonster_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.adventure
ADD
    CONSTRAINT adventure_idmonster_fkey FOREIGN KEY (idmonster) REFERENCES public.monster(id);--
    -- TOC entry 2804 (class 2606 OID 17380)
    -- Name: hero hero_iddamageproficience_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_iddamageproficience_fkey FOREIGN KEY (iddamageproficience) REFERENCES public.proficience(id);--
    -- TOC entry 2805 (class 2606 OID 17385)
    -- Name: hero hero_iddefenceproficience_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_iddefenceproficience_fkey FOREIGN KEY (iddefenceproficience) REFERENCES public.proficience(id);--
    -- TOC entry 2803 (class 2606 OID 17375)
    -- Name: hero hero_idplaystatus_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_idplaystatus_fkey FOREIGN KEY (idplaystatus) REFERENCES public.play_status(id);--
    -- TOC entry 2801 (class 2606 OID 17365)
    -- Name: hero hero_idshield_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_idshield_fkey FOREIGN KEY (idshield) REFERENCES public.shield(id);--
    -- TOC entry 2802 (class 2606 OID 17370)
    -- Name: hero hero_idweapon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_idweapon_fkey FOREIGN KEY (idweapon) REFERENCES public.weapon(id);--
    -- TOC entry 2800 (class 2606 OID 17337)
    -- Name: inventory_item inventory_item_iditem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.inventory_item
ADD
    CONSTRAINT inventory_item_iditem_fkey FOREIGN KEY (iditem) REFERENCES public.item(id);--
    -- TOC entry 2797 (class 2606 OID 17281)
    -- Name: shield shield_iditem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.shield
ADD
    CONSTRAINT shield_iditem_fkey FOREIGN KEY (iditem) REFERENCES public.item(id);--
    -- TOC entry 2798 (class 2606 OID 17297)
    -- Name: weapon weapon_iditem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.weapon
ADD
    CONSTRAINT weapon_iditem_fkey FOREIGN KEY (iditem) REFERENCES public.item(id);-- Completed on 2019-01-30 00:10:19
    --
    -- PostgreSQL database dump complete
    --