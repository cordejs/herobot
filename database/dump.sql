--
-- PostgreSQL database dump
--
-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1
-- Started on 2019-02-10 10:57:23
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
    -- TOC entry 220 (class 1259 OID 20447)
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
    -- TOC entry 218 (class 1259 OID 20443)
    -- Name: adventure_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.adventure_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.adventure_id_seq OWNER TO postgres;--
    -- TOC entry 3013 (class 0 OID 0)
    -- Dependencies: 218
    -- Name: adventure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.adventure_id_seq OWNED BY public.adventure.id;--
    -- TOC entry 219 (class 1259 OID 20445)
    -- Name: adventure_idmonster_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.adventure_idmonster_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.adventure_idmonster_seq OWNER TO postgres;--
    -- TOC entry 3014 (class 0 OID 0)
    -- Dependencies: 219
    -- Name: adventure_idmonster_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.adventure_idmonster_seq OWNED BY public.adventure.idmonster;--
    -- TOC entry 203 (class 1259 OID 17913)
    -- Name: bag; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.bag (
        id integer NOT NULL,
        idhero integer NOT NULL,
        idequip integer NOT NULL
    );
ALTER TABLE
    public.bag OWNER TO postgres;--
    -- TOC entry 200 (class 1259 OID 17907)
    -- Name: bag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.bag_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.bag_id_seq OWNER TO postgres;--
    -- TOC entry 3015 (class 0 OID 0)
    -- Dependencies: 200
    -- Name: bag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.bag_id_seq OWNED BY public.bag.id;--
    -- TOC entry 202 (class 1259 OID 17911)
    -- Name: bag_idequip_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.bag_idequip_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.bag_idequip_seq OWNER TO postgres;--
    -- TOC entry 3016 (class 0 OID 0)
    -- Dependencies: 202
    -- Name: bag_idequip_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.bag_idequip_seq OWNED BY public.bag.idequip;--
    -- TOC entry 201 (class 1259 OID 17909)
    -- Name: bag_idhero_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.bag_idhero_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.bag_idhero_seq OWNER TO postgres;--
    -- TOC entry 3017 (class 0 OID 0)
    -- Dependencies: 201
    -- Name: bag_idhero_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.bag_idhero_seq OWNED BY public.bag.idhero;--
    -- TOC entry 199 (class 1259 OID 17889)
    -- Name: equip; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.equip (
        id integer NOT NULL,
        name character(30) NOT NULL,
        price integer NOT NULL
    );
ALTER TABLE
    public.equip OWNER TO postgres;--
    -- TOC entry 198 (class 1259 OID 17887)
    -- Name: equip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.equip_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.equip_id_seq OWNER TO postgres;--
    -- TOC entry 3018 (class 0 OID 0)
    -- Dependencies: 198
    -- Name: equip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.equip_id_seq OWNED BY public.equip.id;--
    -- TOC entry 232 (class 1259 OID 20495)
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
        idshield integer NOT NULL,
        idweapon integer NOT NULL,
        idplaystatus integer NOT NULL,
        iddamageproficience integer NOT NULL,
        iddefenceproficience integer NOT NULL,
        idheroclass integer NOT NULL
    );
ALTER TABLE
    public.hero OWNER TO postgres;--
    -- TOC entry 226 (class 1259 OID 20483)
    -- Name: hero_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_id_seq OWNER TO postgres;--
    -- TOC entry 3019 (class 0 OID 0)
    -- Dependencies: 226
    -- Name: hero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_id_seq OWNED BY public.hero.id;--
    -- TOC entry 230 (class 1259 OID 20491)
    -- Name: hero_iddamageproficience_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_iddamageproficience_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_iddamageproficience_seq OWNER TO postgres;--
    -- TOC entry 3020 (class 0 OID 0)
    -- Dependencies: 230
    -- Name: hero_iddamageproficience_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_iddamageproficience_seq OWNED BY public.hero.iddamageproficience;--
    -- TOC entry 231 (class 1259 OID 20493)
    -- Name: hero_iddefenceproficience_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_iddefenceproficience_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_iddefenceproficience_seq OWNER TO postgres;--
    -- TOC entry 3021 (class 0 OID 0)
    -- Dependencies: 231
    -- Name: hero_iddefenceproficience_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_iddefenceproficience_seq OWNED BY public.hero.iddefenceproficience;--
    -- TOC entry 234 (class 1259 OID 20543)
    -- Name: hero_idheroclass_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_idheroclass_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_idheroclass_seq OWNER TO postgres;--
    -- TOC entry 3022 (class 0 OID 0)
    -- Dependencies: 234
    -- Name: hero_idheroclass_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_idheroclass_seq OWNED BY public.hero.idheroclass;--
    -- TOC entry 229 (class 1259 OID 20489)
    -- Name: hero_idplaystatus_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_idplaystatus_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_idplaystatus_seq OWNER TO postgres;--
    -- TOC entry 3023 (class 0 OID 0)
    -- Dependencies: 229
    -- Name: hero_idplaystatus_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_idplaystatus_seq OWNED BY public.hero.idplaystatus;--
    -- TOC entry 227 (class 1259 OID 20485)
    -- Name: hero_idshield_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_idshield_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_idshield_seq OWNER TO postgres;--
    -- TOC entry 3024 (class 0 OID 0)
    -- Dependencies: 227
    -- Name: hero_idshield_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_idshield_seq OWNED BY public.hero.idshield;--
    -- TOC entry 228 (class 1259 OID 20487)
    -- Name: hero_idweapon_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.hero_idweapon_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.hero_idweapon_seq OWNER TO postgres;--
    -- TOC entry 3025 (class 0 OID 0)
    -- Dependencies: 228
    -- Name: hero_idweapon_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.hero_idweapon_seq OWNED BY public.hero.idweapon;--
    -- TOC entry 205 (class 1259 OID 17933)
    -- Name: heroclass; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.heroclass (
        id integer NOT NULL,
        name character(30) NOT NULL,
        damagebuff integer NOT NULL,
        shieldbuff integer NOT NULL,
        hpbuff integer NOT NULL,
        goldbuff integer NOT NULL,
        expbuff integer NOT NULL,
        attackspeedbuff integer NOT NULL
    );
ALTER TABLE
    public.heroclass OWNER TO postgres;--
    -- TOC entry 204 (class 1259 OID 17931)
    -- Name: heroclass_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.heroclass_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.heroclass_id_seq OWNER TO postgres;--
    -- TOC entry 3026 (class 0 OID 0)
    -- Dependencies: 204
    -- Name: heroclass_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.heroclass_id_seq OWNED BY public.heroclass.id;--
    -- TOC entry 225 (class 1259 OID 20471)
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
    -- TOC entry 223 (class 1259 OID 20467)
    -- Name: inventory_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.inventory_item_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.inventory_item_id_seq OWNER TO postgres;--
    -- TOC entry 3027 (class 0 OID 0)
    -- Dependencies: 223
    -- Name: inventory_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.inventory_item_id_seq OWNED BY public.inventory_item.id;--
    -- TOC entry 224 (class 1259 OID 20469)
    -- Name: inventory_item_iditem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.inventory_item_iditem_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.inventory_item_iditem_seq OWNER TO postgres;--
    -- TOC entry 3028 (class 0 OID 0)
    -- Dependencies: 224
    -- Name: inventory_item_iditem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.inventory_item_iditem_seq OWNED BY public.inventory_item.iditem;--
    -- TOC entry 211 (class 1259 OID 20405)
    -- Name: item; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.item (
        id integer NOT NULL,
        name character(50) NOT NULL,
        price integer NOT NULL
    );
ALTER TABLE
    public.item OWNER TO postgres;--
    -- TOC entry 210 (class 1259 OID 20403)
    -- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.item_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.item_id_seq OWNER TO postgres;--
    -- TOC entry 3029 (class 0 OID 0)
    -- Dependencies: 210
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
    -- TOC entry 3030 (class 0 OID 0)
    -- Dependencies: 196
    -- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;--
    -- TOC entry 209 (class 1259 OID 20397)
    -- Name: monster; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.monster (
        id integer NOT NULL,
        name character(30) NOT NULL,
        level integer NOT NULL,
        damage integer NOT NULL,
        hp integer NOT NULL,
        defence integer NOT NULL,
        givedxp integer NOT NULL,
        givedgold integer NOT NULL,
        idequipdrop integer NOT NULL,
        equipdropchance integer,
        gold integer
    );
ALTER TABLE
    public.monster OWNER TO postgres;--
    -- TOC entry 208 (class 1259 OID 20395)
    -- Name: monster_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.monster_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.monster_id_seq OWNER TO postgres;--
    -- TOC entry 3031 (class 0 OID 0)
    -- Dependencies: 208
    -- Name: monster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.monster_id_seq OWNED BY public.monster.id;--
    -- TOC entry 233 (class 1259 OID 20531)
    -- Name: monster_idequipdrop_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.monster_idequipdrop_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.monster_idequipdrop_seq OWNER TO postgres;--
    -- TOC entry 3032 (class 0 OID 0)
    -- Dependencies: 233
    -- Name: monster_idequipdrop_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.monster_idequipdrop_seq OWNED BY public.monster.idequipdrop;--
    -- TOC entry 222 (class 1259 OID 20461)
    -- Name: play_status; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.play_status (
        id integer NOT NULL,
        task character(30) NOT NULL,
        monsterskilled integer NOT NULL,
        exp integer NOT NULL,
        timestarted integer NOT NULL
    );
ALTER TABLE
    public.play_status OWNER TO postgres;--
    -- TOC entry 221 (class 1259 OID 20459)
    -- Name: play_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.play_status_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.play_status_id_seq OWNER TO postgres;--
    -- TOC entry 3033 (class 0 OID 0)
    -- Dependencies: 221
    -- Name: play_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.play_status_id_seq OWNED BY public.play_status.id;--
    -- TOC entry 207 (class 1259 OID 20389)
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
    -- TOC entry 206 (class 1259 OID 20387)
    -- Name: proficience_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.proficience_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.proficience_id_seq OWNER TO postgres;--
    -- TOC entry 3034 (class 0 OID 0)
    -- Dependencies: 206
    -- Name: proficience_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.proficience_id_seq OWNED BY public.proficience.id;--
    -- TOC entry 214 (class 1259 OID 20415)
    -- Name: shield; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.shield (
        id integer NOT NULL,
        defence integer NOT NULL,
        iditem integer NOT NULL
    );
ALTER TABLE
    public.shield OWNER TO postgres;--
    -- TOC entry 212 (class 1259 OID 20411)
    -- Name: shield_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.shield_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.shield_id_seq OWNER TO postgres;--
    -- TOC entry 3035 (class 0 OID 0)
    -- Dependencies: 212
    -- Name: shield_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.shield_id_seq OWNED BY public.shield.id;--
    -- TOC entry 213 (class 1259 OID 20413)
    -- Name: shield_iditem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.shield_iditem_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.shield_iditem_seq OWNER TO postgres;--
    -- TOC entry 3036 (class 0 OID 0)
    -- Dependencies: 213
    -- Name: shield_iditem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.shield_iditem_seq OWNED BY public.shield.iditem;--
    -- TOC entry 217 (class 1259 OID 20431)
    -- Name: weapon; Type: TABLE; Schema: public; Owner: postgres
    --
    CREATE TABLE public.weapon (
        id integer NOT NULL,
        damage integer NOT NULL,
        iditem integer NOT NULL
    );
ALTER TABLE
    public.weapon OWNER TO postgres;--
    -- TOC entry 215 (class 1259 OID 20427)
    -- Name: weapon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.weapon_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.weapon_id_seq OWNER TO postgres;--
    -- TOC entry 3037 (class 0 OID 0)
    -- Dependencies: 215
    -- Name: weapon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.weapon_id_seq OWNED BY public.weapon.id;--
    -- TOC entry 216 (class 1259 OID 20429)
    -- Name: weapon_iditem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    CREATE SEQUENCE public.weapon_iditem_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE
    public.weapon_iditem_seq OWNER TO postgres;--
    -- TOC entry 3038 (class 0 OID 0)
    -- Dependencies: 216
    -- Name: weapon_iditem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    ALTER SEQUENCE public.weapon_iditem_seq OWNED BY public.weapon.iditem;--
    -- TOC entry 2798 (class 2604 OID 20450)
    -- Name: adventure id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.adventure
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.adventure_id_seq' :: regclass);--
    -- TOC entry 2799 (class 2604 OID 20451)
    -- Name: adventure idmonster; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.adventure
ALTER COLUMN
    idmonster
SET
    DEFAULT nextval('public.adventure_idmonster_seq' :: regclass);--
    -- TOC entry 2786 (class 2604 OID 17916)
    -- Name: bag id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.bag
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.bag_id_seq' :: regclass);--
    -- TOC entry 2787 (class 2604 OID 17917)
    -- Name: bag idhero; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.bag
ALTER COLUMN
    idhero
SET
    DEFAULT nextval('public.bag_idhero_seq' :: regclass);--
    -- TOC entry 2788 (class 2604 OID 17918)
    -- Name: bag idequip; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.bag
ALTER COLUMN
    idequip
SET
    DEFAULT nextval('public.bag_idequip_seq' :: regclass);--
    -- TOC entry 2785 (class 2604 OID 17892)
    -- Name: equip id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.equip
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.equip_id_seq' :: regclass);--
    -- TOC entry 2803 (class 2604 OID 20498)
    -- Name: hero id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.hero_id_seq' :: regclass);--
    -- TOC entry 2804 (class 2604 OID 20499)
    -- Name: hero idshield; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    idshield
SET
    DEFAULT nextval('public.hero_idshield_seq' :: regclass);--
    -- TOC entry 2805 (class 2604 OID 20500)
    -- Name: hero idweapon; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    idweapon
SET
    DEFAULT nextval('public.hero_idweapon_seq' :: regclass);--
    -- TOC entry 2806 (class 2604 OID 20501)
    -- Name: hero idplaystatus; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    idplaystatus
SET
    DEFAULT nextval('public.hero_idplaystatus_seq' :: regclass);--
    -- TOC entry 2807 (class 2604 OID 20502)
    -- Name: hero iddamageproficience; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    iddamageproficience
SET
    DEFAULT nextval('public.hero_iddamageproficience_seq' :: regclass);--
    -- TOC entry 2808 (class 2604 OID 20503)
    -- Name: hero iddefenceproficience; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    iddefenceproficience
SET
    DEFAULT nextval('public.hero_iddefenceproficience_seq' :: regclass);--
    -- TOC entry 2809 (class 2604 OID 20545)
    -- Name: hero idheroclass; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ALTER COLUMN
    idheroclass
SET
    DEFAULT nextval('public.hero_idheroclass_seq' :: regclass);--
    -- TOC entry 2789 (class 2604 OID 17936)
    -- Name: heroclass id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.heroclass
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.heroclass_id_seq' :: regclass);--
    -- TOC entry 2801 (class 2604 OID 20474)
    -- Name: inventory_item id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.inventory_item
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.inventory_item_id_seq' :: regclass);--
    -- TOC entry 2802 (class 2604 OID 20475)
    -- Name: inventory_item iditem; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.inventory_item
ALTER COLUMN
    iditem
SET
    DEFAULT nextval('public.inventory_item_iditem_seq' :: regclass);--
    -- TOC entry 2793 (class 2604 OID 20408)
    -- Name: item id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.item
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.item_id_seq' :: regclass);--
    -- TOC entry 2784 (class 2604 OID 16404)
    -- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.migrations
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.migrations_id_seq' :: regclass);--
    -- TOC entry 2791 (class 2604 OID 20400)
    -- Name: monster id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.monster
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.monster_id_seq' :: regclass);--
    -- TOC entry 2792 (class 2604 OID 20533)
    -- Name: monster idequipdrop; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.monster
ALTER COLUMN
    idequipdrop
SET
    DEFAULT nextval('public.monster_idequipdrop_seq' :: regclass);--
    -- TOC entry 2800 (class 2604 OID 20464)
    -- Name: play_status id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.play_status
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.play_status_id_seq' :: regclass);--
    -- TOC entry 2790 (class 2604 OID 20392)
    -- Name: proficience id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.proficience
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.proficience_id_seq' :: regclass);--
    -- TOC entry 2794 (class 2604 OID 20418)
    -- Name: shield id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.shield
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.shield_id_seq' :: regclass);--
    -- TOC entry 2795 (class 2604 OID 20419)
    -- Name: shield iditem; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.shield
ALTER COLUMN
    iditem
SET
    DEFAULT nextval('public.shield_iditem_seq' :: regclass);--
    -- TOC entry 2796 (class 2604 OID 20434)
    -- Name: weapon id; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.weapon
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.weapon_id_seq' :: regclass);--
    -- TOC entry 2797 (class 2604 OID 20435)
    -- Name: weapon iditem; Type: DEFAULT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.weapon
ALTER COLUMN
    iditem
SET
    DEFAULT nextval('public.weapon_iditem_seq' :: regclass);--
    -- TOC entry 2993 (class 0 OID 20447)
    -- Dependencies: 220
    -- Data for Name: adventure; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.adventure (id, level, name, idmonster)
FROM
    stdin;\.--
    -- TOC entry 2976 (class 0 OID 17913)
    -- Dependencies: 203
    -- Data for Name: bag; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.bag (id, idhero, idequip)
FROM
    stdin;\.--
    -- TOC entry 2972 (class 0 OID 17889)
    -- Dependencies: 199
    -- Data for Name: equip; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.equip (id, name, price)
FROM
    stdin;\.--
    -- TOC entry 3005 (class 0 OID 20495)
    -- Dependencies: 232
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
        idshield,
        idweapon,
        idplaystatus,
        iddamageproficience,
        iddefenceproficience,
        idheroclass
    )
FROM
    stdin;\.--
    -- TOC entry 2978 (class 0 OID 17933)
    -- Dependencies: 205
    -- Data for Name: heroclass; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.heroclass (
        id,
        name,
        damagebuff,
        shieldbuff,
        hpbuff,
        goldbuff,
        expbuff,
        attackspeedbuff
    )
FROM
    stdin;\.--
    -- TOC entry 2998 (class 0 OID 20471)
    -- Dependencies: 225
    -- Data for Name: inventory_item; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.inventory_item (id, amount, equiped, iditem)
FROM
    stdin;\.--
    -- TOC entry 2984 (class 0 OID 20405)
    -- Dependencies: 211
    -- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.item (id, name, price)
FROM
    stdin;\.--
    -- TOC entry 2970 (class 0 OID 16401)
    -- Dependencies: 197
    -- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.migrations (id, "timestamp", name)
FROM
    stdin;60 1548891232589 Migration1548891232589 61 1548895699089 Migration1548895699089 62 1549740124536 Migration1549740124536 \.--
    -- TOC entry 2982 (class 0 OID 20397)
    -- Dependencies: 209
    -- Data for Name: monster; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.monster (
        id,
        name,
        level,
        damage,
        hp,
        defence,
        givedxp,
        givedgold,
        idequipdrop,
        equipdropchance,
        gold
    )
FROM
    stdin;\.--
    -- TOC entry 2995 (class 0 OID 20461)
    -- Dependencies: 222
    -- Data for Name: play_status; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.play_status (id, task, monsterskilled, exp, timestarted)
FROM
    stdin;\.--
    -- TOC entry 2980 (class 0 OID 20389)
    -- Dependencies: 207
    -- Data for Name: proficience; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.proficience (id, level, xp, levelmaxxp)
FROM
    stdin;\.--
    -- TOC entry 2987 (class 0 OID 20415)
    -- Dependencies: 214
    -- Data for Name: shield; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.shield (id, defence, iditem)
FROM
    stdin;\.--
    -- TOC entry 2990 (class 0 OID 20431)
    -- Dependencies: 217
    -- Data for Name: weapon; Type: TABLE DATA; Schema: public; Owner: postgres
    --
    COPY public.weapon (id, damage, iditem)
FROM
    stdin;\.--
    -- TOC entry 3039 (class 0 OID 0)
    -- Dependencies: 218
    -- Name: adventure_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.adventure_id_seq', 1, false);--
    -- TOC entry 3040 (class 0 OID 0)
    -- Dependencies: 219
    -- Name: adventure_idmonster_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.adventure_idmonster_seq', 1, false);--
    -- TOC entry 3041 (class 0 OID 0)
    -- Dependencies: 200
    -- Name: bag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.bag_id_seq', 1, false);--
    -- TOC entry 3042 (class 0 OID 0)
    -- Dependencies: 202
    -- Name: bag_idequip_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.bag_idequip_seq', 1, false);--
    -- TOC entry 3043 (class 0 OID 0)
    -- Dependencies: 201
    -- Name: bag_idhero_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.bag_idhero_seq', 1, false);--
    -- TOC entry 3044 (class 0 OID 0)
    -- Dependencies: 198
    -- Name: equip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.equip_id_seq', 1, false);--
    -- TOC entry 3045 (class 0 OID 0)
    -- Dependencies: 226
    -- Name: hero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_id_seq', 1, false);--
    -- TOC entry 3046 (class 0 OID 0)
    -- Dependencies: 230
    -- Name: hero_iddamageproficience_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_iddamageproficience_seq', 1, false);--
    -- TOC entry 3047 (class 0 OID 0)
    -- Dependencies: 231
    -- Name: hero_iddefenceproficience_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_iddefenceproficience_seq', 1, false);--
    -- TOC entry 3048 (class 0 OID 0)
    -- Dependencies: 234
    -- Name: hero_idheroclass_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_idheroclass_seq', 1, false);--
    -- TOC entry 3049 (class 0 OID 0)
    -- Dependencies: 229
    -- Name: hero_idplaystatus_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_idplaystatus_seq', 1, false);--
    -- TOC entry 3050 (class 0 OID 0)
    -- Dependencies: 227
    -- Name: hero_idshield_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_idshield_seq', 1, false);--
    -- TOC entry 3051 (class 0 OID 0)
    -- Dependencies: 228
    -- Name: hero_idweapon_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.hero_idweapon_seq', 1, false);--
    -- TOC entry 3052 (class 0 OID 0)
    -- Dependencies: 204
    -- Name: heroclass_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.heroclass_id_seq', 1, false);--
    -- TOC entry 3053 (class 0 OID 0)
    -- Dependencies: 223
    -- Name: inventory_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.inventory_item_id_seq', 1, false);--
    -- TOC entry 3054 (class 0 OID 0)
    -- Dependencies: 224
    -- Name: inventory_item_iditem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.inventory_item_iditem_seq', 1, false);--
    -- TOC entry 3055 (class 0 OID 0)
    -- Dependencies: 210
    -- Name: item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.item_id_seq', 1, false);--
    -- TOC entry 3056 (class 0 OID 0)
    -- Dependencies: 196
    -- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.migrations_id_seq', 62, true);--
    -- TOC entry 3057 (class 0 OID 0)
    -- Dependencies: 208
    -- Name: monster_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.monster_id_seq', 1, false);--
    -- TOC entry 3058 (class 0 OID 0)
    -- Dependencies: 233
    -- Name: monster_idequipdrop_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.monster_idequipdrop_seq', 1, false);--
    -- TOC entry 3059 (class 0 OID 0)
    -- Dependencies: 221
    -- Name: play_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.play_status_id_seq', 1, false);--
    -- TOC entry 3060 (class 0 OID 0)
    -- Dependencies: 206
    -- Name: proficience_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.proficience_id_seq', 1, false);--
    -- TOC entry 3061 (class 0 OID 0)
    -- Dependencies: 212
    -- Name: shield_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.shield_id_seq', 1, false);--
    -- TOC entry 3062 (class 0 OID 0)
    -- Dependencies: 213
    -- Name: shield_iditem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.shield_iditem_seq', 1, false);--
    -- TOC entry 3063 (class 0 OID 0)
    -- Dependencies: 215
    -- Name: weapon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.weapon_id_seq', 1, false);--
    -- TOC entry 3064 (class 0 OID 0)
    -- Dependencies: 216
    -- Name: weapon_iditem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
    --
SELECT
    pg_catalog.setval('public.weapon_iditem_seq', 1, false);--
    -- TOC entry 2811 (class 2606 OID 16409)
    -- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.migrations
ADD
    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);--
    -- TOC entry 2829 (class 2606 OID 20453)
    -- Name: adventure adventure_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.adventure
ADD
    CONSTRAINT adventure_pkey PRIMARY KEY (id);--
    -- TOC entry 2815 (class 2606 OID 17920)
    -- Name: bag bag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.bag
ADD
    CONSTRAINT bag_pkey PRIMARY KEY (id);--
    -- TOC entry 2813 (class 2606 OID 17894)
    -- Name: equip equip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.equip
ADD
    CONSTRAINT equip_pkey PRIMARY KEY (id);--
    -- TOC entry 2835 (class 2606 OID 20505)
    -- Name: hero hero_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_pkey PRIMARY KEY (id);--
    -- TOC entry 2817 (class 2606 OID 17938)
    -- Name: heroclass heroclass_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.heroclass
ADD
    CONSTRAINT heroclass_pkey PRIMARY KEY (id);--
    -- TOC entry 2833 (class 2606 OID 20477)
    -- Name: inventory_item inventory_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.inventory_item
ADD
    CONSTRAINT inventory_item_pkey PRIMARY KEY (id);--
    -- TOC entry 2823 (class 2606 OID 20410)
    -- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.item
ADD
    CONSTRAINT item_pkey PRIMARY KEY (id);--
    -- TOC entry 2821 (class 2606 OID 20402)
    -- Name: monster monster_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.monster
ADD
    CONSTRAINT monster_pkey PRIMARY KEY (id);--
    -- TOC entry 2831 (class 2606 OID 20466)
    -- Name: play_status play_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.play_status
ADD
    CONSTRAINT play_status_pkey PRIMARY KEY (id);--
    -- TOC entry 2819 (class 2606 OID 20394)
    -- Name: proficience proficience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.proficience
ADD
    CONSTRAINT proficience_pkey PRIMARY KEY (id);--
    -- TOC entry 2825 (class 2606 OID 20421)
    -- Name: shield shield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.shield
ADD
    CONSTRAINT shield_pkey PRIMARY KEY (id);--
    -- TOC entry 2827 (class 2606 OID 20437)
    -- Name: weapon weapon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.weapon
ADD
    CONSTRAINT weapon_pkey PRIMARY KEY (id);--
    -- TOC entry 2840 (class 2606 OID 20454)
    -- Name: adventure adventure_idmonster_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.adventure
ADD
    CONSTRAINT adventure_idmonster_fkey FOREIGN KEY (idmonster) REFERENCES public.monster(id);--
    -- TOC entry 2836 (class 2606 OID 17926)
    -- Name: bag bag_idequip_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.bag
ADD
    CONSTRAINT bag_idequip_fkey FOREIGN KEY (idequip) REFERENCES public.equip(id);--
    -- TOC entry 2837 (class 2606 OID 20538)
    -- Name: monster fk_equipdrop; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.monster
ADD
    CONSTRAINT fk_equipdrop FOREIGN KEY (idequipdrop) REFERENCES public.equip(id);--
    -- TOC entry 2847 (class 2606 OID 20550)
    -- Name: hero fk_heroclass; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT fk_heroclass FOREIGN KEY (idheroclass) REFERENCES public.heroclass(id);--
    -- TOC entry 2845 (class 2606 OID 20521)
    -- Name: hero hero_iddamageproficience_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_iddamageproficience_fkey FOREIGN KEY (iddamageproficience) REFERENCES public.proficience(id);--
    -- TOC entry 2846 (class 2606 OID 20526)
    -- Name: hero hero_iddefenceproficience_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_iddefenceproficience_fkey FOREIGN KEY (iddefenceproficience) REFERENCES public.proficience(id);--
    -- TOC entry 2844 (class 2606 OID 20516)
    -- Name: hero hero_idplaystatus_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_idplaystatus_fkey FOREIGN KEY (idplaystatus) REFERENCES public.play_status(id);--
    -- TOC entry 2842 (class 2606 OID 20506)
    -- Name: hero hero_idshield_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_idshield_fkey FOREIGN KEY (idshield) REFERENCES public.shield(id);--
    -- TOC entry 2843 (class 2606 OID 20511)
    -- Name: hero hero_idweapon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.hero
ADD
    CONSTRAINT hero_idweapon_fkey FOREIGN KEY (idweapon) REFERENCES public.weapon(id);--
    -- TOC entry 2841 (class 2606 OID 20478)
    -- Name: inventory_item inventory_item_iditem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.inventory_item
ADD
    CONSTRAINT inventory_item_iditem_fkey FOREIGN KEY (iditem) REFERENCES public.item(id);--
    -- TOC entry 2838 (class 2606 OID 20422)
    -- Name: shield shield_iditem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.shield
ADD
    CONSTRAINT shield_iditem_fkey FOREIGN KEY (iditem) REFERENCES public.item(id);--
    -- TOC entry 2839 (class 2606 OID 20438)
    -- Name: weapon weapon_iditem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
ALTER TABLE
    ONLY public.weapon
ADD
    CONSTRAINT weapon_iditem_fkey FOREIGN KEY (iditem) REFERENCES public.item(id);-- Completed on 2019-02-10 10:57:23
    --
    -- PostgreSQL database dump complete
    --