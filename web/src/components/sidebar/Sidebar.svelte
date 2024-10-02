<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import { page } from "$app/stores";

    import CobaltLogo from "$components/sidebar/CobaltLogo.svelte";

    let screenWidth: number;

    const navItems = [
        { name: "save", link: "/", icon: "↓" },
        { name: "settings", link: "/settings", icon: "⚙" },
    ];
</script>

<svelte:window bind:innerWidth={screenWidth} />

<nav id="sidebar" aria-label={$t("a11y.tabs.tab_panel")}>
    <CobaltLogo />
    <ul id="sidebar-tabs" role="tablist">
        {#each navItems as item}
            <li>
                <a
                    href={item.link}
                    class="sidebar-tab"
                    class:active={$page.url.pathname === item.link}
                    aria-label={$t(`sidebar.${item.name}`)}
                >
                    <span class="icon">{item.icon}</span>
                </a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    #sidebar {
        background: var(--sidebar-bg);
        height: 100vh;
        width: 60px;
        position: sticky;
        top: 0;
        left: 0;
        padding: 20px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #sidebar-tabs {
        list-style-type: none;
        padding: 0;
        margin: 40px 0 0 0;
        width: 100%;
    }

    .sidebar-tab {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 60px;
        color: var(--text-color);
        text-decoration: none;
        font-size: 24px;
        transition: background-color 0.2s ease;
    }

    .sidebar-tab:hover {
        background-color: var(--sidebar-hover);
    }

    .sidebar-tab.active {
        background-color: var(--sidebar-active);
    }

    @media screen and (max-width: 768px) {
        #sidebar {
            width: 100%;
            height: auto;
            position: fixed;
            bottom: 0;
            top: auto;
            padding: 10px 0;
            flex-direction: row;
        }

        #sidebar-tabs {
            display: flex;
            justify-content: space-around;
            margin: 0;
        }

        .sidebar-tab {
            height: 40px;
        }
    }
</style>
